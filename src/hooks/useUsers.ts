import {
	createUser,
	deleteUser,
	getUsers,
	updateUser,
} from '@/services/userService'
import { CreateUserDto, User } from '@/types/user'
import { useEffect, useState } from 'react'

export const useUsers = () => {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(false)

	const fetchUsers = async () => {
		setLoading(true)
		try {
			const data = await getUsers()
			setUsers(data)
		} catch (error) {
			console.error('Ошибка при загрузке пользователей:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	const handleSave = async (
		user: Partial<User> & { password?: string; _id?: string }
	): Promise<User> => {
		const userToSend = { ...user }

		if ('_id' in userToSend && userToSend.password === '') {
			delete userToSend.password
		}

		if (userToSend._id) {
			await updateUser(userToSend._id, userToSend)
		} else {
			await createUser(userToSend as CreateUserDto)
		}

		await fetchUsers()

		return {} as User
	}

	const handleDelete = async (id: string) => {
		await deleteUser(id)
		setUsers(prev => prev.filter(u => u._id !== id))
	}

	return {
		users,
		loading,
		fetchUsers,
		handleSave,
		handleDelete,
	}
}

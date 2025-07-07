import { UserFormModal } from '@/components' // универсальная форма
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import PageHeader from '@/components/PageHeader'
import { useUsers } from '@/hooks/useUsers'
import { CreateUserDto, User } from '@/types/user'
import { Button, Container } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import RecruitersFilters from './components/RecruitersFilters'
import RecruitersTable from './components/RecruitersTable'

const RecruitersPage = () => {
	const { users, fetchUsers, handleDelete, handleSave } = useUsers()
	const { enqueueSnackbar } = useSnackbar()

	const [modalOpen, setModalOpen] = useState(false)
	const [editingUser, setEditingUser] = useState<User | null>(null)

	const [deleteModalOpen, setDeleteModalOpen] = useState(false)
	const [deletingUser, setDeletingUser] = useState<User | null>(null)

	const [search, setSearch] = useState('')

	useEffect(() => {
		fetchUsers()
	}, [])

	const handleOpenCreate = () => {
		setEditingUser(null)
		setModalOpen(true)
	}

	const handleOpenEdit = (user: User) => {
		setEditingUser(user)
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const handleOpenDelete = (user: User) => {
		setDeletingUser(user)
		setDeleteModalOpen(true)
	}

	const handleCloseDelete = () => {
		setDeletingUser(null)
		setDeleteModalOpen(false)
	}

	const handleConfirmDelete = async () => {
		if (!deletingUser) return
		try {
			await handleDelete(deletingUser._id)
			enqueueSnackbar('Рекрутер удалён', { variant: 'success' })
			await fetchUsers()
			handleCloseDelete()
		} catch (error) {
			enqueueSnackbar('Ошибка при удалении', { variant: 'error' })
			console.error(error)
		}
	}

	const handleSaveUser = async (data: CreateUserDto & { _id?: string }) => {
		try {
			const normalized: CreateUserDto & { _id?: string } = {
				...data,
				role:
					data.role === 'admin' || data.role === 'recruiter'
						? data.role
						: 'recruiter',
			}
			await handleSave(normalized)
			enqueueSnackbar('Рекрутер успешно сохранён', { variant: 'success' })
			await fetchUsers()
			setModalOpen(false)
		} catch (error: any) {
			if (
				error.response?.data?.message?.includes('email') &&
				error.response.data.message.includes('already exists')
			) {
				throw error
			}
			enqueueSnackbar('Ошибка при сохранении рекрутера', { variant: 'error' })
			throw error
		}
	}

	const filteredUsers = users.filter(user =>
		user.name.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<Container maxWidth={false}>
			<PageHeader
				title='Рекрутеры'
				actions={
					<Button variant='contained' onClick={handleOpenCreate}>
						Добавить рекрутера
					</Button>
				}
			/>

			<RecruitersFilters search={search} onSearchChange={setSearch} />

			<RecruitersTable
				users={filteredUsers}
				onEdit={handleOpenEdit}
				onDelete={id => {
					const user = users.find(u => u._id === id)
					if (user) handleOpenDelete(user)
				}}
			/>

			<UserFormModal
				open={modalOpen}
				initialData={editingUser ?? undefined}
				onClose={handleCloseModal}
				onSave={handleSaveUser}
			/>

			<ConfirmDeleteDialog
				open={deleteModalOpen}
				onClose={handleCloseDelete}
				onConfirm={handleConfirmDelete}
				title='Удалить рекрутера'
				description={`Вы уверены, что хотите удалить рекрутера ${deletingUser?.name}?`}
			/>
		</Container>
	)
}

export default RecruitersPage

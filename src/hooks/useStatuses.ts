import {
	createStatus,
	deleteStatus,
	getStatuses,
	updateStatus,
} from '@/services/statusService'
import { CreateStatusDto, Status } from '@/types/status'
import { useEffect, useState } from 'react'

export const useStatuses = () => {
	const [statuses, setStatuses] = useState<Status[]>([])
	const [loading, setLoading] = useState(false)

	const fetchStatuses = async () => {
		setLoading(true)
		try {
			const data = await getStatuses()
			setStatuses(data)
		} catch (error) {
			console.error('Ошибка при загрузке статусов:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchStatuses()
	}, [])

	const handleSave = async (
		status: Status | CreateStatusDto
	): Promise<void> => {
		if ('_id' in status) {
			await updateStatus(status._id, status)
		} else {
			await createStatus(status)
		}
		await fetchStatuses()
	}

	const handleDelete = async (id: string) => {
		await deleteStatus(id)
		setStatuses(prev => prev.filter(s => s._id !== id))
	}

	return {
		statuses,
		loading,
		handleSave,
		handleDelete,
		refetch: fetchStatuses,
	}
}

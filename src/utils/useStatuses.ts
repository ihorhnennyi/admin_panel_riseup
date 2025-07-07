import { getStatuses } from '@/services/statusService'
import { Status } from '@/types/status'
import { useEffect, useState } from 'react'

export const useStatuses = () => {
	const [statuses, setStatuses] = useState<Status[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetch = async () => {
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

		fetch()
	}, [])

	return { statuses, loading }
}

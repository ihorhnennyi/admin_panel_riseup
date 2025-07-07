import { getLeadsByDays, LeadDayItem } from '@/services/analyticsService'
import { useEffect, useState } from 'react'

export const useLeadsByDays = (days: number) => {
	const [data, setData] = useState<LeadDayItem[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetch = async () => {
			setLoading(true)
			try {
				const result = await getLeadsByDays(days)
				setData(result)
			} catch (e) {
				console.error('Ошибка при загрузке лидов:', e)
			} finally {
				setLoading(false)
			}
		}

		fetch()
	}, [days])

	return { data, loading }
}

// src/hooks/useCandidatesAnalytics.ts
import {
	AnalyticsItem,
	getCandidatesAnalytics,
} from '@/services/analyticsService'
import { useEffect, useState } from 'react'

interface CandidatesAnalytics {
	statuses: AnalyticsItem[]
	cities: AnalyticsItem[]
	sources: AnalyticsItem[]
	loading: boolean
}

export const useCandidatesAnalytics = (): CandidatesAnalytics => {
	const [statuses, setStatuses] = useState<AnalyticsItem[]>([])
	const [cities, setCities] = useState<AnalyticsItem[]>([])
	const [sources, setSources] = useState<AnalyticsItem[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const load = async () => {
			setLoading(true)
			try {
				const res = await getCandidatesAnalytics()
				setStatuses(res.statuses)
				setCities(res.cities)
				setSources(res.sources)
			} catch (error) {
				console.error('Ошибка при получении аналитики:', error)
			} finally {
				setLoading(false)
			}
		}

		load()
	}, [])

	return { statuses, cities, sources, loading }
}

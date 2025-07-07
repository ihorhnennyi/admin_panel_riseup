import { formatDateRangeForAPI } from '@/utils/date'
import { api } from './api'

export interface AnalyticsItem {
	label: string
	value: number
	color?: string
}

export interface LeadDayItem {
	date: string
	leads: number
}

export interface CandidatesAnalyticsResponse {
	statuses: AnalyticsItem[]
	cities: AnalyticsItem[]
	sources: AnalyticsItem[]
}

export interface RecruiterStatusStatsItem {
	id: string
	recruiter: string
	statusCounts: Record<string, number>
	date: string
}

export interface RecruiterActivityItem {
	date: string
	[recruiterName: string]: number | string
}

export const getCandidatesAnalytics =
	async (): Promise<CandidatesAnalyticsResponse> => {
		const response = await api.get<{ data: CandidatesAnalyticsResponse }>(
			'/analytics/candidates-summary'
		)
		return response.data.data
	}

export const getLeadsByDays = async (days: number): Promise<LeadDayItem[]> => {
	const response = await api.get<{ data: LeadDayItem[] }>(
		`/analytics/leads-by-days?days=${days}`
	)
	return response.data.data
}

export const getRecruitersStatusStats = async (filters?: {
	search?: string
	dateRange?: [Date | null, Date | null]
}): Promise<RecruiterStatusStatsItem[]> => {
	const params = new URLSearchParams()

	if (filters?.search) {
		params.append('search', filters.search)
	}

	const { startDate, endDate } = formatDateRangeForAPI(filters?.dateRange)

	if (startDate) params.append('startDate', startDate)
	if (endDate) params.append('endDate', endDate)

	const response = await api.get<{
		success: boolean
		data: { success: boolean; data: RecruiterStatusStatsItem[] }
	}>(`/analytics/recruiters-status-summary?${params.toString()}`)

	return response.data.data.data
}

export const getRecruiterActivityChartData = async (filters?: {
	search?: string
	dateRange?: [Date | null, Date | null]
}) => {
	const params = new URLSearchParams()

	if (filters?.search) params.append('search', filters.search)

	if (filters?.dateRange) {
		const [start, end] = filters.dateRange
		if (start) params.append('startDate', start.toISOString())
		if (end) params.append('endDate', end.toISOString())
	} else {
		const end = new Date()
		const start = new Date()
		start.setDate(end.getDate() - 30)

		params.append('startDate', start.toISOString())
		params.append('endDate', end.toISOString())
	}

	const response = await api.get<{ data: { data: any[] } }>(
		`/analytics/recruiter-activity-chart?${params.toString()}`
	)

	return response.data.data.data
}

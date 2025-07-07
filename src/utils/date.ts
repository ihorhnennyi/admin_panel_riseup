export const formatDateRangeForAPI = (
	dateRange?: [Date | null, Date | null]
): { startDate?: string; endDate?: string } => {
	if (!dateRange) return {}

	const [start, end] = dateRange

	const startDate = start
		? new Date(start.setHours(0, 0, 0, 0)).toISOString()
		: undefined

	const endDate = end
		? new Date(end.setHours(23, 59, 59, 999)).toISOString()
		: undefined

	return { startDate, endDate }
}

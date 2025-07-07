import { CandidatesFiltersData } from '@/types/filters'

const FILTERS_KEY = 'candidatesFilters'

export const saveFiltersToStorage = (filters: CandidatesFiltersData) => {
	const serialized = {
		...filters,
		dateRange: [
			filters.dateRange[0]?.toISOString() ?? null,
			filters.dateRange[1]?.toISOString() ?? null,
		],
	}
	localStorage.setItem(FILTERS_KEY, JSON.stringify(serialized))
}

export const loadFiltersFromStorage = (): CandidatesFiltersData | null => {
	const raw = localStorage.getItem(FILTERS_KEY)
	if (!raw) return null

	try {
		const parsed = JSON.parse(raw)

		const parseDate = (value: any): Date | null => {
			if (!value) return null
			const timestamp = Date.parse(value)
			return isNaN(timestamp) ? null : new Date(timestamp)
		}

		const filters: CandidatesFiltersData = {
			status: parsed.status ?? '',
			source: parsed.source ?? '',
			recruiter: parsed.recruiter ?? '',
			city: parsed.city ?? '',
			search: parsed.search ?? '',
			dateRange: [
				parseDate(parsed.dateRange?.[0]),
				parseDate(parsed.dateRange?.[1]),
			],
		}

		return filters
	} catch {
		return null
	}
}

export const clearFiltersStorage = () => {
	localStorage.removeItem(FILTERS_KEY)
}

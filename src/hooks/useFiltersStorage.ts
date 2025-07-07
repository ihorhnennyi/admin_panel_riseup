import { CandidatesFiltersData } from '@/types/filters'
import {
	loadFiltersFromStorage,
	saveFiltersToStorage,
} from '@/utils/filtersStorage'
import { useEffect, useState } from 'react'

export const useFiltersStorage = (key: string) => {
	const [filters, setFilters] = useState<CandidatesFiltersData>(() => {
		const saved = loadFiltersFromStorage()
		return (
			saved ?? {
				status: '',
				source: '',
				recruiter: '',
				city: '',
				search: '',
				dateRange: [null, null],
			}
		)
	})

	useEffect(() => {
		saveFiltersToStorage(filters)
	}, [filters])

	return { filters, setFilters }
}

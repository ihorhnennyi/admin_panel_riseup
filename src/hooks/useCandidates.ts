import { CandidatesFiltersData } from '@/types/filters'

import {
	createCandidate,
	deleteCandidate,
	getCandidates,
	updateCandidate,
} from '@/services/candidatesService'
import {
	Candidate,
	CreateCandidateDto,
	UpdateCandidateDto,
} from '@/types/candidate'
import { useCallback, useState } from 'react'

interface FetchCandidatesParams {
	page: number
	limit: number
	filters: CandidatesFiltersData
}

export const useCandidates = () => {
	const [candidates, setCandidates] = useState<Candidate[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [total, setTotal] = useState<number>(0)

	const fetchCandidates = useCallback(
		async ({ page, limit, filters }: FetchCandidatesParams) => {
			setLoading(true)
			try {
				const query = {
					page: page + 1, // бэкенд использует 1-based индексацию
					limit,
					status: filters.status || undefined,
					source: filters.source || undefined,
					city: filters.city || undefined,
					search: filters.search || undefined,
					recruiter:
						typeof filters.recruiter === 'string'
							? filters.recruiter
							: filters.recruiter &&
							  typeof filters.recruiter === 'object' &&
							  '_id' in filters.recruiter
							? (filters.recruiter as { _id: string })._id
							: undefined,

					startDate: filters.dateRange[0]
						? filters.dateRange[0].toISOString()
						: undefined,
					endDate: filters.dateRange[1]
						? filters.dateRange[1].toISOString()
						: undefined,
				}

				const res = await getCandidates(query)
				setCandidates(res.data)
				setTotal(res.total)
			} catch (error) {
				console.error('Ошибка при загрузке кандидатов:', error)
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	const handleSave = async (
		data: CreateCandidateDto | (UpdateCandidateDto & { _id: string }),
		page: number,
		limit: number,
		filters: CandidatesFiltersData
	): Promise<Candidate | void> => {
		try {
			const saved =
				'_id' in data
					? await updateCandidate(data._id, data)
					: await createCandidate(data)

			await fetchCandidates({ page, limit, filters })
			return saved
		} catch (error) {
			console.error('Ошибка при сохранении кандидата:', error)
		}
	}

	const handleDelete = async (
		id: string,
		page: number,
		limit: number,
		filters: CandidatesFiltersData
	) => {
		try {
			await deleteCandidate(id)
			await fetchCandidates({ page, limit, filters })
		} catch (error) {
			console.error('Ошибка при удалении кандидата:', error)
		}
	}

	return {
		candidates,
		loading,
		total,
		fetchCandidates,
		handleSave,
		handleDelete,
	}
}

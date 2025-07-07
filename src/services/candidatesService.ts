import { api } from '@/services/api'
import {
	Candidate,
	CreateCandidateDto,
	UpdateCandidateDto,
} from '@/types/candidate'

export const getCandidates = async (
	params: Record<string, any>
): Promise<{ data: Candidate[]; total: number }> => {
	const response = await api.get<{
		data: {
			data: Candidate[]
			total: number
		}
	}>('/candidates', { params })

	return {
		data: response.data.data.data,
		total: response.data.data.total,
	}
}

// Получить одного кандидата по ID
export const getCandidate = async (id: string): Promise<Candidate> => {
	const response = await api.get<{ data: Candidate }>(`/candidates/${id}`)
	return response.data.data
}

// Создать кандидата
export const createCandidate = async (
	data: CreateCandidateDto
): Promise<Candidate> => {
	const response = await api.post<{ data: Candidate }>('/candidates', data)
	return response.data.data
}

// Обновить кандидата
export const updateCandidate = async (
	id: string,
	data: UpdateCandidateDto
): Promise<Candidate> => {
	const response = await api.patch<{ data: Candidate }>(
		`/candidates/${id}`,
		data
	)
	return response.data.data
}

// Удалить кандидата
export const deleteCandidate = async (id: string): Promise<void> => {
	await api.delete(`/candidates/${id}`)
}

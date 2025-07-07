import { Button, Container } from '@mui/material'
import { useEffect, useState } from 'react'

import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import PageHeader from '@/components/PageHeader'
import { useCandidates } from '@/hooks/useCandidates'
import { useDataTableState } from '@/hooks/useDataTableState'
import { Candidate } from '@/types/candidate'
import {
	loadFiltersFromStorage,
	saveFiltersToStorage,
} from '@/utils/filtersStorage'

import { CandidatesFiltersData } from '@/types/filters'
import CandidateFormModal from './components/CandidateFormModal'
import CandidatesFilters from './components/CandidatesFilters'
import CandidatesTable from './components/CandidatesTable'

const CandidatesPage = () => {
	const [formOpen, setFormOpen] = useState(false)
	const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
		null
	)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [deletingCandidateId, setDeletingCandidateId] = useState<string | null>(
		null
	)

	const [filters, setFilters] = useState<CandidatesFiltersData>(
		loadFiltersFromStorage() ?? {
			status: '',
			source: '',
			recruiter: '',
			city: '',
			search: '',
			dateRange: [null, null],
		}
	)

	const { paginationModel, sortModel, setPaginationModel, setSortModel } =
		useDataTableState()

	const {
		candidates,
		loading,
		total,
		fetchCandidates,
		handleDelete,
		handleSave,
	} = useCandidates()

	const currentPage = paginationModel.page
	const pageSize = paginationModel.pageSize

	useEffect(() => {
		saveFiltersToStorage(filters)
	}, [filters])

	useEffect(() => {
		fetchCandidates({
			page: currentPage,
			limit: pageSize,
			filters,
		})
	}, [currentPage, pageSize, filters, fetchCandidates])

	const handleEdit = (candidate: Candidate) => {
		setEditingCandidate(candidate)
		setFormOpen(true)
	}

	const handleDeleteRequest = (id: string) => {
		setDeletingCandidateId(id)
		setDeleteDialogOpen(true)
	}

	const handleConfirmDelete = async () => {
		if (!deletingCandidateId) return
		await handleDelete(deletingCandidateId, currentPage, pageSize, filters)
		setDeletingCandidateId(null)
		setDeleteDialogOpen(false)
	}

	const handleFormSave = async (data: Candidate | Omit<Candidate, '_id'>) => {
		const mapped = {
			...data,
			status: typeof data.status === 'object' ? data.status._id : data.status,
			city: typeof data.city === 'object' ? data.city._id : data.city,
			source: typeof data.source === 'object' ? data.source._id : data.source,
			createdBy:
				typeof data.createdBy === 'object'
					? data.createdBy._id
					: data.createdBy,
		} as any

		await handleSave(mapped, currentPage, pageSize, filters)
		setFormOpen(false)
		setEditingCandidate(null)
	}

	return (
		<Container maxWidth={false}>
			<PageHeader
				title='Кандидаты'
				actions={
					<Button
						variant='contained'
						color='primary'
						onClick={() => setFormOpen(true)}
					>
						Добавить кандидата
					</Button>
				}
			/>

			<CandidatesFilters filters={filters} onChange={setFilters} />

			<CandidatesTable
				candidates={candidates}
				loading={loading}
				total={total}
				page={currentPage}
				pageSize={pageSize}
				onPageChange={setPaginationModel}
				onSortChange={setSortModel}
				onEditCandidate={handleEdit}
				onDeleteCandidate={handleDeleteRequest}
			/>

			<CandidateFormModal
				open={formOpen}
				initialData={editingCandidate ?? undefined}
				onClose={() => {
					setFormOpen(false)
					setEditingCandidate(null)
				}}
				onSave={handleFormSave}
			/>

			<ConfirmDeleteDialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
				onConfirm={handleConfirmDelete}
			/>
		</Container>
	)
}

export default CandidatesPage

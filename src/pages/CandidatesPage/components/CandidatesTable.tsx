import { DataTable } from '@/components'
import { Candidate } from '@/types/candidate'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCandidateColumns } from './columns'
import { mapCandidatesToRows } from './helpers'

interface CandidatesTableProps {
	candidates: Candidate[]
	loading: boolean
	total: number
	page: number
	pageSize: number
	onPageChange: (model: { page: number; pageSize: number }) => void
	onSortChange: (model: any) => void
	onEditCandidate?: (candidate: Candidate) => void
	onDeleteCandidate?: (id: string) => void
}

const CandidatesTable = ({
	candidates,
	loading,
	total,
	page,
	pageSize,
	onPageChange,
	onSortChange,
	onEditCandidate,
	onDeleteCandidate,
}: CandidatesTableProps) => {
	const navigate = useNavigate()

	const rows = useMemo(
		() => mapCandidatesToRows(Array.isArray(candidates) ? candidates : []),
		[candidates]
	)

	const columns = useMemo(
		() =>
			getCandidateColumns({
				onEdit: onEditCandidate,
				onDelete: onDeleteCandidate,
			}),
		[onEditCandidate, onDeleteCandidate]
	)

	return (
		<DataTable
			columns={columns}
			rows={rows}
			loading={loading}
			pageSize={pageSize}
			page={page}
			total={total}
			onPageChange={onPageChange}
			onSortChange={onSortChange}
			onRowClick={params => {
				const row = params.row
				navigate(`/candidates/${row.original._id}`)
			}}
		/>
	)
}

export default CandidatesTable

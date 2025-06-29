import { DataTable } from '@/components'
import { useDataTableState } from '@/hooks/useDataTableState'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

// Тип строки таблицы
export interface CandidateRow {
	id: number
	name: string
	status: string
	city: string
	source: string
}

// Пропсы
interface CandidatesTableProps {
	onEditCandidate?: (candidate: CandidateRow) => void
}

const CandidatesTable = ({ onEditCandidate }: CandidatesTableProps) => {
	const navigate = useNavigate()

	const { paginationModel, sortModel, setPaginationModel, setSortModel } =
		useDataTableState()

	const columns: GridColDef[] = useMemo(
		() => [
			{ field: 'id', headerName: 'ID', width: 80 },
			{ field: 'name', headerName: 'Имя', flex: 1 },
			{ field: 'status', headerName: 'Статус', width: 150 },
			{ field: 'city', headerName: 'Город', width: 150 },
			{ field: 'source', headerName: 'Источник', width: 150 },
			{
				field: 'actions',
				headerName: '',
				width: 100,
				sortable: false,
				disableColumnMenu: true,
				renderCell: params => (
					<>
						<IconButton
							color='primary'
							size='small'
							onClick={e => {
								e.stopPropagation()
								console.log('Edit', params.row.id)
								onEditCandidate?.(params.row) // Вызовем callback
							}}
						>
							<EditIcon fontSize='small' />
						</IconButton>
						<IconButton
							color='error'
							size='small'
							onClick={e => {
								e.stopPropagation()
								console.log('Delete', params.row.id)
								// TODO: здесь можно вставить confirm + delete
							}}
						>
							<DeleteIcon fontSize='small' />
						</IconButton>
					</>
				),
			},
		],
		[onEditCandidate]
	)

	const rows: CandidateRow[] = [
		{
			id: 1,
			name: 'Иван Иванов',
			status: 'Новый',
			city: 'Киев',
			source: 'Telegram',
		},
		{
			id: 2,
			name: 'Петр Петров',
			status: 'Интервью',
			city: 'Харьков',
			source: 'Instagram',
		},
	]

	return (
		<DataTable
			columns={columns}
			rows={rows}
			pageSize={paginationModel.pageSize}
			page={paginationModel.page}
			onPageChange={setPaginationModel}
			onSortChange={setSortModel}
			onRowClick={params => {
				navigate(`/candidates/${params.id}`)
			}}
		/>
	)
}

export default CandidatesTable

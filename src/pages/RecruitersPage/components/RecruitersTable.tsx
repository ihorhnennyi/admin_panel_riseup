import { DataTable } from '@/components'
import { useDataTableState } from '@/hooks/useDataTableState'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

// Тип строки таблицы
interface RecruiterRow {
	id: number
	name: string
	email: string
	phone: string
}

const RecruitersTable = () => {
	const navigate = useNavigate()

	const { paginationModel, sortModel, setPaginationModel, setSortModel } =
		useDataTableState()

	const columns: GridColDef[] = useMemo(
		() => [
			{ field: 'id', headerName: 'ID', width: 80 },
			{ field: 'name', headerName: 'Имя', flex: 1 },
			{ field: 'email', headerName: 'Email', flex: 1 },
			{ field: 'phone', headerName: 'Телефон', width: 150 },
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
							}}
						>
							<DeleteIcon fontSize='small' />
						</IconButton>
					</>
				),
			},
		],
		[]
	)

	const rows: RecruiterRow[] = [
		{
			id: 1,
			name: 'Игорь Петров',
			email: 'igor@test.com',
			phone: '+380123456789',
		},
		{
			id: 2,
			name: 'Анна Иванова',
			email: 'anna@test.com',
			phone: '+380987654321',
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
				navigate(`/recruiters/${params.id}`)
			}}
		/>
	)
}

export default RecruitersTable

import { DataTable } from '@/components'
import { useBranches } from '@/hooks/useBranches'
import { useCities } from '@/hooks/useCities'
import { useDataTableState } from '@/hooks/useDataTableState'
import { User } from '@/types/user'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'

interface RecruitersTableProps {
	users: User[]
	onDelete: (id: string) => void
	onEdit: (user: User) => void
}

const RecruitersTable = ({ users, onDelete, onEdit }: RecruitersTableProps) => {
	const { paginationModel, sortModel, setPaginationModel, setSortModel } =
		useDataTableState()

	const { cities } = useCities()
	const { branches } = useBranches()

	const columns: GridColDef[] = useMemo(
		() => [
			{
				field: 'index',
				headerName: '№',
				width: 70,
				sortable: false,
				disableColumnMenu: true,
				renderCell: params =>
					users.findIndex(user => user._id === params.row._id) + 1,
			},
			{ field: 'name', headerName: 'Имя', flex: 1 },
			{ field: 'email', headerName: 'Email', flex: 1.5 },
			{ field: 'role', headerName: 'Роль', width: 120 },
			{
				field: 'phone',
				headerName: 'Телефон',
				flex: 1,
				renderCell: params => params.row.phone || '-',
			},
			{
				field: 'city',
				headerName: 'Город',
				flex: 1,
				renderCell: params => {
					const city = cities.find(c => c._id === params.row.city)
					return city?.name || '-'
				},
			},
			{
				field: 'branch',
				headerName: 'Филиал',
				flex: 1,
				renderCell: params => {
					const branch = branches.find(b => b._id === params.row.branch)
					return branch?.name || '-'
				},
			},
			{
				field: 'isActive',
				headerName: 'Активен',
				width: 100,
				renderCell: params => (params.row.isActive ? 'Да' : 'Нет'),
			},
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
								onEdit(params.row as User)
							}}
						>
							<EditIcon fontSize='small' />
						</IconButton>
						<IconButton
							color='error'
							size='small'
							onClick={e => {
								e.stopPropagation()
								onDelete(params.row._id)
							}}
						>
							<DeleteIcon fontSize='small' />
						</IconButton>
					</>
				),
			},
		],
		[onDelete, onEdit, users, cities, branches]
	)

	return (
		<DataTable
			columns={columns}
			rows={users}
			getRowId={row => row._id}
			pageSize={paginationModel.pageSize}
			page={paginationModel.page}
			onPageChange={setPaginationModel}
			onSortChange={setSortModel}
		/>
	)
}

export default RecruitersTable

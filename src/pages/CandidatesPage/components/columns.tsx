import ColoredLabel from '@/components/ColoredLabel'
import { Candidate } from '@/types/candidate'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { CandidateRow } from './helpers'

interface GetColumnsArgs {
	onEdit?: (candidate: Candidate) => void
	onDelete?: (id: string) => void
}

export const getCandidateColumns = ({
	onEdit,
	onDelete,
}: GetColumnsArgs): GridColDef[] => [
	{ field: 'id', headerName: '№', width: 80 },
	{ field: 'lastName', headerName: 'Фамилия', width: 150 },
	{ field: 'firstName', headerName: 'Имя', width: 150 },
	{ field: 'middleName', headerName: 'Отчество', width: 150 },
	{ field: 'email', headerName: 'Почта', width: 200 },
	{ field: 'phone', headerName: 'Телефон', width: 160 },
	{ field: 'age', headerName: 'Возраст', width: 100 },
	{ field: 'city', headerName: 'Город', width: 150 },
	{ field: 'description', headerName: 'Описание', width: 200 },
	{ field: 'salary', headerName: 'Зарплата', width: 120 },
	{ field: 'source', headerName: 'Источник', width: 150 },
	{
		field: 'status',
		headerName: 'Статус',
		width: 180,
		renderCell: params => {
			const candidate: Candidate = (params.row as CandidateRow).original
			const status = candidate.status
			const name = typeof status === 'object' ? status.name : status
			const color = typeof status === 'object' ? status.color : '#ccc'
			return <ColoredLabel label={name ?? ''} color={color} />
		},
	},
	{ field: 'recruiter', headerName: 'Рекрутер', width: 150 },
	{ field: 'createdAt', headerName: 'Создан', width: 180 },
	{ field: 'updatedAt', headerName: 'Обновлён', width: 180 },
	{
		field: 'actions',
		headerName: '',
		width: 100,
		sortable: false,
		disableColumnMenu: true,
		renderCell: params => {
			const row = params.row as CandidateRow
			const candidate = row.original

			return (
				<>
					<IconButton
						color='primary'
						size='small'
						onClick={e => {
							e.stopPropagation()
							onEdit?.(candidate)
						}}
					>
						<EditIcon fontSize='small' />
					</IconButton>
					<IconButton
						color='error'
						size='small'
						onClick={e => {
							e.stopPropagation()
							onDelete?.(candidate._id)
						}}
					>
						<DeleteIcon fontSize='small' />
					</IconButton>
				</>
			)
		},
	},
]

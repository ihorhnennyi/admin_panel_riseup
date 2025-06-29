import { DataTable } from '@/components'
import { useDataTableState } from '@/hooks/useDataTableState'
import { GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'

// Тип строки таблицы
interface StatisticsRow {
	id: number
	date: string
	recruiter: string
	newLeads: number
	closed: number
	conversion: string
}

const StatisticsTable = () => {
	const { paginationModel, sortModel, setPaginationModel, setSortModel } =
		useDataTableState()

	const columns: GridColDef[] = useMemo(
		() => [
			{ field: 'id', headerName: 'ID', width: 80 },
			{ field: 'date', headerName: 'Дата', width: 150 },
			{ field: 'recruiter', headerName: 'Рекрутер', flex: 1 },
			{ field: 'newLeads', headerName: 'Новые лиды', width: 150 },
			{ field: 'closed', headerName: 'Закрыто', width: 150 },
			{ field: 'conversion', headerName: 'Конверсия %', width: 150 },
		],
		[]
	)

	const rows: StatisticsRow[] = [
		{
			id: 1,
			date: '2024-06-01',
			recruiter: 'Игорь Петров',
			newLeads: 12,
			closed: 5,
			conversion: '41.6%',
		},
		{
			id: 2,
			date: '2024-06-02',
			recruiter: 'Анна Иванова',
			newLeads: 8,
			closed: 3,
			conversion: '37.5%',
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
				console.log('Row clicked', params.id)
			}}
		/>
	)
}

export default StatisticsTable

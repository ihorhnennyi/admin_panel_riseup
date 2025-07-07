import { Box } from '@mui/material'
import {
	DataGrid,
	GridColDef,
	GridPaginationModel,
	GridRowParams,
	GridRowSelectionModel,
	GridSortModel,
} from '@mui/x-data-grid'

interface DataTableProps {
	columns: GridColDef[]
	rows: any[]
	loading?: boolean
	pageSize?: number
	total?: number
	page?: number
	onPageChange?: (model: GridPaginationModel) => void
	onSortChange?: (model: GridSortModel) => void
	onRowSelectionChange?: (selection: GridRowSelectionModel) => void
	onRowClick?: (params: GridRowParams) => void
	getRowId?: (row: any) => string | number
	/** 👇 добавляем */
	onPageSizeChange?: (pageSize: number) => void
}

const DataTable = ({
	columns,
	rows,
	loading = false,
	pageSize = 10,
	total = 0,
	page = 0,
	onPageChange,
	onPageSizeChange,
	onSortChange,
	onRowSelectionChange,
	onRowClick,
	getRowId,
}: DataTableProps) => {
	return (
		<Box sx={{ width: '100%' }}>
			<DataGrid
				autoHeight
				rows={rows}
				columns={columns}
				rowCount={total}
				pageSizeOptions={[10, 20, 50]}
				paginationMode='server'
				paginationModel={{
					pageSize,
					page,
				}}
				onPaginationModelChange={({ page, pageSize }) => {
					onPageChange?.({ page, pageSize })
					onPageSizeChange?.(pageSize)
				}}
				loading={loading}
				disableRowSelectionOnClick
				onRowSelectionModelChange={onRowSelectionChange}
				onRowClick={onRowClick}
				sortingMode='server'
				onSortModelChange={onSortChange}
				getRowId={getRowId}
				sx={{
					borderRadius: 2,
					border: 'none',
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: 'action.hover',
						fontWeight: 'bold',
					},
					'& .MuiDataGrid-row:hover': {
						backgroundColor: 'action.hover',
					},
				}}
			/>
		</Box>
	)
}

export default DataTable

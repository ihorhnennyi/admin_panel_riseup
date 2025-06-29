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
}

const DataTable = ({
	columns,
	rows,
	loading = false,
	pageSize = 10,
	total = 0,
	page = 0,
	onPageChange,
	onSortChange,
	onRowSelectionChange,
	onRowClick,
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
				onPaginationModelChange={onPageChange}
				loading={loading}
				disableRowSelectionOnClick
				onRowSelectionModelChange={onRowSelectionChange}
				onRowClick={onRowClick}
				sortingMode='server'
				onSortModelChange={onSortChange}
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

import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { useState } from 'react'

export const useDataTableState = (initialPageSize = 10) => {
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
		page: 0,
		pageSize: initialPageSize,
	})

	const [sortModel, setSortModel] = useState<GridSortModel>([])

	return {
		paginationModel,
		sortModel,
		setPaginationModel,
		setSortModel,
	}
}

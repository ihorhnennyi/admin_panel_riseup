import { DateRangePicker } from '@/components'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Box, IconButton, TextField, Tooltip } from '@mui/material'
import { useEffect, useRef } from 'react'

const FILTERS_KEY = 'statisticsFilters'

interface Props {
	filters: {
		search: string
		dateRange: [Date | null, Date | null]
	}
	setFilters: React.Dispatch<
		React.SetStateAction<{
			search: string
			dateRange: [Date | null, Date | null]
		}>
	>
}

const StatisticsFilters = ({ filters, setFilters }: Props) => {
	const prevFiltersRef = useRef(filters)

	useEffect(() => {
		if (JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)) {
			localStorage.setItem(FILTERS_KEY, JSON.stringify(filters))
			prevFiltersRef.current = filters
		}
	}, [filters])

	const resetFilters = () => {
		const empty = { search: '', dateRange: [null, null] as [null, null] }
		setFilters(empty)
		localStorage.setItem(FILTERS_KEY, JSON.stringify(empty))
	}

	return (
		<Box display='flex' flexWrap='wrap' gap={2} mb={3} alignItems='center'>
			<TextField
				label='Поиск'
				variant='outlined'
				value={filters.search}
				onChange={e =>
					setFilters(prev => ({ ...prev, search: e.target.value }))
				}
				size='small'
			/>

			<DateRangePicker
				value={filters.dateRange}
				onChange={dateRange => setFilters(prev => ({ ...prev, dateRange }))}
			/>

			<Tooltip title='Сбросить фильтры'>
				<IconButton onClick={resetFilters} color='primary'>
					<RestartAltIcon />
				</IconButton>
			</Tooltip>
		</Box>
	)
}

export default StatisticsFilters

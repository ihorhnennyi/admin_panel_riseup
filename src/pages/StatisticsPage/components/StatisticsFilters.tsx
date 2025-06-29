import { DateRangePicker } from '@/components'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Box, IconButton, TextField, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'

const FILTERS_KEY = 'statisticsFilters'

const StatisticsFilters = () => {
	const [search, setSearch] = useState('')
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
		null,
		null,
	])

	useEffect(() => {
		const saved = localStorage.getItem(FILTERS_KEY)
		if (saved) {
			const parsed = JSON.parse(saved)
			setSearch(parsed.search ?? '')
			setDateRange(parsed.dateRange ?? [null, null])
		}
	}, [])

	useEffect(() => {
		const filters = { search, dateRange }
		localStorage.setItem(FILTERS_KEY, JSON.stringify(filters))
	}, [search, dateRange])

	const resetFilters = () => {
		setSearch('')
		setDateRange([null, null])
		localStorage.removeItem(FILTERS_KEY)
	}

	return (
		<Box display='flex' flexWrap='wrap' gap={2} mb={3} alignItems='center'>
			<TextField
				label='Поиск'
				variant='outlined'
				value={search}
				onChange={e => setSearch(e.target.value)}
				size='small'
			/>

			<DateRangePicker value={dateRange} onChange={setDateRange} />

			<Tooltip title='Сбросить фильтры'>
				<IconButton onClick={resetFilters} color='primary'>
					<RestartAltIcon />
				</IconButton>
			</Tooltip>
		</Box>
	)
}

export default StatisticsFilters

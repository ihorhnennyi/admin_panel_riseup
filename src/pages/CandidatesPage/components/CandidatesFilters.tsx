import { DateRangePicker } from '@/components'
import { useCities } from '@/hooks/useCities'
import { useSources } from '@/hooks/useSources'
import { useStatuses } from '@/hooks/useStatuses'
import { useUsers } from '@/hooks/useUsers'
import { CandidatesFiltersData } from '@/types/filters'
import {
	clearFiltersStorage,
	loadFiltersFromStorage,
	saveFiltersToStorage,
} from '@/utils/filtersStorage'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import {
	Box,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Tooltip,
} from '@mui/material'
import { useEffect } from 'react'

interface Props {
	filters: CandidatesFiltersData
	onChange: (filters: CandidatesFiltersData) => void
}

const CandidatesFilters = ({ filters, onChange }: Props) => {
	const { statuses } = useStatuses()
	const { sources } = useSources()
	const { users } = useUsers()
	const { cities } = useCities()

	useEffect(() => {
		const saved = loadFiltersFromStorage()
		if (saved) onChange(saved)
	}, [])

	useEffect(() => {
		saveFiltersToStorage(filters)
	}, [filters])

	const handleChange = (key: keyof CandidatesFiltersData, value: any) => {
		let newFilters = { ...filters, [key]: value }

		// автообрезка времени до конца дня, если дата одинаковая
		if (
			key === 'dateRange' &&
			value?.[0] instanceof Date &&
			value?.[1] instanceof Date &&
			value[0].toDateString() === value[1].toDateString()
		) {
			const endDate = new Date(value[1])
			endDate.setHours(23, 59, 59, 999)
			newFilters.dateRange = [value[0], endDate]
		}

		onChange(newFilters)
	}

	const resetFilters = () => {
		const reset: CandidatesFiltersData = {
			status: '',
			source: '',
			recruiter: '',
			city: '',
			search: '',
			dateRange: [null, null],
		}
		onChange(reset)
		clearFiltersStorage()
	}

	return (
		<Box display='flex' flexWrap='wrap' gap={2} mb={3} alignItems='center'>
			<TextField
				label='Поиск'
				variant='outlined'
				value={filters.search}
				onChange={e => handleChange('search', e.target.value)}
				size='small'
			/>

			<FormControl size='small'>
				<InputLabel>Статус</InputLabel>
				<Select
					value={filters.status}
					label='Статус'
					onChange={e => handleChange('status', e.target.value)}
					sx={{ minWidth: 150 }}
				>
					<MenuItem value=''>Все</MenuItem>
					{statuses.map(s => (
						<MenuItem key={s._id} value={s._id}>
							{s.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl size='small'>
				<InputLabel>Источник</InputLabel>
				<Select
					value={filters.source}
					label='Источник'
					onChange={e => handleChange('source', e.target.value)}
					sx={{ minWidth: 150 }}
				>
					<MenuItem value=''>Все</MenuItem>
					{sources.map(s => (
						<MenuItem key={s._id} value={s._id}>
							{s.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl size='small'>
				<InputLabel>Город</InputLabel>
				<Select
					value={filters.city}
					label='Город'
					onChange={e => handleChange('city', e.target.value)}
					sx={{ minWidth: 150 }}
				>
					<MenuItem value=''>Все</MenuItem>
					{cities.map(city => (
						<MenuItem key={city._id} value={city._id}>
							{city.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl size='small'>
				<InputLabel>Рекрутер</InputLabel>
				<Select
					value={filters.recruiter}
					label='Рекрутер'
					onChange={e => handleChange('recruiter', e.target.value)}
					sx={{ minWidth: 150 }}
				>
					<MenuItem value=''>Все</MenuItem>
					{users.map(user => (
						<MenuItem key={user._id} value={user._id}>
							{user.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<DateRangePicker
				value={filters.dateRange}
				onChange={value => handleChange('dateRange', value)}
			/>

			<Tooltip title='Сбросить фильтры'>
				<IconButton onClick={resetFilters} color='primary'>
					<RestartAltIcon />
				</IconButton>
			</Tooltip>
		</Box>
	)
}

export default CandidatesFilters

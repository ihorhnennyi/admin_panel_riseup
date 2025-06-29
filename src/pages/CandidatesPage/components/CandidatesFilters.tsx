import { DateRangePicker } from '@/components'
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
import { useEffect, useState } from 'react'

const statuses = ['Все', 'Новый', 'В работе', 'Интервью', 'Отказ', 'Принят']
const sources = ['Все', 'Telegram', 'Instagram', 'Реклама', 'Сайт']
const recruiters = ['Все', 'Иванов', 'Петров', 'Сидоров']

const FILTERS_KEY = 'candidatesFilters'

const CandidatesFilters = () => {
	const [status, setStatus] = useState('Все')
	const [source, setSource] = useState('Все')
	const [recruiter, setRecruiter] = useState('Все')
	const [search, setSearch] = useState('')
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
		null,
		null,
	])

	useEffect(() => {
		const saved = localStorage.getItem(FILTERS_KEY)
		if (saved) {
			const parsed = JSON.parse(saved)
			setStatus(parsed.status ?? 'Все')
			setSource(parsed.source ?? 'Все')
			setRecruiter(parsed.recruiter ?? 'Все')
			setSearch(parsed.search ?? '')
			setDateRange(parsed.dateRange ?? [null, null])
		}
	}, [])

	useEffect(() => {
		const filters = { status, source, recruiter, search, dateRange }
		localStorage.setItem(FILTERS_KEY, JSON.stringify(filters))
	}, [status, source, recruiter, search, dateRange])

	const resetFilters = () => {
		setStatus('Все')
		setSource('Все')
		setRecruiter('Все')
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

			<FormControl size='small'>
				<InputLabel>Статус</InputLabel>
				<Select
					value={status}
					label='Статус'
					onChange={e => setStatus(e.target.value)}
					sx={{ minWidth: 150 }}
				>
					{statuses.map(s => (
						<MenuItem key={s} value={s}>
							{s}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl size='small'>
				<InputLabel>Источник</InputLabel>
				<Select
					value={source}
					label='Источник'
					onChange={e => setSource(e.target.value)}
					sx={{ minWidth: 150 }}
				>
					{sources.map(s => (
						<MenuItem key={s} value={s}>
							{s}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl size='small'>
				<InputLabel>Рекрутер</InputLabel>
				<Select
					value={recruiter}
					label='Рекрутер'
					onChange={e => setRecruiter(e.target.value)}
					sx={{ minWidth: 150 }}
				>
					{recruiters.map(r => (
						<MenuItem key={r} value={r}>
							{r}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<DateRangePicker value={dateRange} onChange={setDateRange} />

			<Tooltip title='Сбросить фильтры'>
				<IconButton onClick={resetFilters} color='primary'>
					<RestartAltIcon />
				</IconButton>
			</Tooltip>
		</Box>
	)
}

export default CandidatesFilters

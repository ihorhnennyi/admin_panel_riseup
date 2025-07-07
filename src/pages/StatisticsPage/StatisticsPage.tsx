import PageHeader from '@/components/PageHeader'
import { Container } from '@mui/material'
import { useState } from 'react'
import StatisticsFilters from './components/StatisticsFilters'
import StatisticsTable from './components/StatisticsTable'

const exportFields = [
	{ label: 'Дата', value: 'date' },
	{ label: 'Рекрутер', value: 'recruiter' },
	{ label: 'Новые лиды', value: 'newLeads' },
	{ label: 'Закрыто', value: 'closed' },
	{ label: 'Конверсия %', value: 'conversion' },
]

const FILTERS_KEY = 'statisticsFilters'

const getInitialFilters = (): {
	search: string
	dateRange: [Date | null, Date | null]
} => {
	const saved = localStorage.getItem(FILTERS_KEY)
	if (saved) {
		try {
			const parsed = JSON.parse(saved)
			return {
				search: parsed.search || '',
				dateRange: [
					parsed.dateRange?.[0] ? new Date(parsed.dateRange[0]) : null,
					parsed.dateRange?.[1] ? new Date(parsed.dateRange[1]) : null,
				],
			}
		} catch {
			// corrupted json
		}
	}
	return { search: '', dateRange: [null, null] }
}

const StatisticsPage = () => {
	const [exportOpen, setExportOpen] = useState(false)
	const [filters, setFilters] = useState(getInitialFilters)

	return (
		<Container maxWidth={false}>
			<PageHeader
				title='Статистика'
				// actions={
				// 	<Button
				// 		variant='contained'
				// 		color='primary'
				// 		onClick={() => setExportOpen(true)}
				// 	>
				// 		Экспортировать
				// 	</Button>
				// }
			/>

			<StatisticsFilters filters={filters} setFilters={setFilters} />
			<StatisticsTable filters={filters} />

			{/* <ExportModal
				open={exportOpen}
				onClose={() => setExportOpen(false)}
				fields={exportFields}
				onExport={fields => {
					console.log('Экспортируем поля:', fields)
					setExportOpen(false)
				}}
			/> */}
		</Container>
	)
}

export default StatisticsPage

import ExportModal from '@/components/ExportModal'
import PageHeader from '@/components/PageHeader'
import { Button, Container } from '@mui/material'
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

const StatisticsPage = () => {
	const [exportOpen, setExportOpen] = useState(false)

	return (
		<Container maxWidth={false}>
			<PageHeader
				title='Статистика'
				actions={
					<Button
						variant='contained'
						color='primary'
						onClick={() => setExportOpen(true)}
					>
						Экспортировать
					</Button>
				}
			/>

			<StatisticsFilters />
			<StatisticsTable />
			<ExportModal
				open={exportOpen}
				onClose={() => setExportOpen(false)}
				fields={exportFields}
				onExport={fields => {
					console.log('Экспортируем поля:', fields)
					setExportOpen(false)
				}}
			/>
		</Container>
	)
}

export default StatisticsPage

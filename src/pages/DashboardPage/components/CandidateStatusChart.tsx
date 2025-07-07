import { ChartCard } from '@/components'
import { useCandidatesAnalytics } from '@/hooks/useCandidatesAnalytics'
import { AnalyticsItem } from '@/services/analyticsService'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const CandidateStatusChart = () => {
	const { statuses, loading } = useCandidatesAnalytics()
	const chartData = statuses.map((item: AnalyticsItem) => ({
		status: item.label,
		count: item.value,
		color: item.color,
	}))

	return (
		<ChartCard title='Кандидаты по статусам'>
			{loading ? (
				<div>Загрузка...</div>
			) : (
				<ResponsiveContainer width='100%' height={260}>
					<BarChart data={chartData} barSize={40}>
						<CartesianGrid strokeDasharray='3 3' vertical={false} />
						<XAxis dataKey='status' />
						<YAxis allowDecimals={false} />
						<Tooltip />
						<Bar dataKey='count'>
							{chartData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			)}
		</ChartCard>
	)
}

export default CandidateStatusChart

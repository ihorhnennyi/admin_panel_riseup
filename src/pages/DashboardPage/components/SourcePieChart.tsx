import ChartCard from '@/components/ChartCard'
import { useCandidatesAnalytics } from '@/hooks/useCandidatesAnalytics'
import { AnalyticsItem } from '@/services/analyticsService'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const SourcePieChart = () => {
	const { sources, loading } = useCandidatesAnalytics()

	const pieData = sources.map((item: AnalyticsItem) => ({
		source: item.label,
		value: item.value,
		color: item.color,
	}))

	return (
		<ChartCard title='Кандидаты по источникам'>
			{loading ? (
				<div>Загрузка...</div>
			) : (
				<ResponsiveContainer width='100%' height={260}>
					<PieChart>
						<Pie
							data={pieData}
							dataKey='value'
							nameKey='source'
							cx='50%'
							cy='50%'
							outerRadius={100}
						>
							{pieData.map(entry => (
								<Cell key={entry.source} fill={entry.color} />
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			)}
		</ChartCard>
	)
}

export default SourcePieChart

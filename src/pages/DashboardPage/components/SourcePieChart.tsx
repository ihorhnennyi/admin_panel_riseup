import ChartCard from '@/components/ChartCard'
import { sourcePieData } from '@/data/sourcePie'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const SourcePieChart = () => {
	return (
		<ChartCard title='Кандидаты по источникам'>
			<ResponsiveContainer width='100%' height={260}>
				<PieChart>
					<Pie
						data={sourcePieData}
						dataKey='value'
						nameKey='source'
						cx='50%'
						cy='50%'
						outerRadius={100}
					>
						{sourcePieData.map(entry => (
							<Cell key={entry.source} fill={entry.color} />
						))}
					</Pie>

					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</ChartCard>
	)
}

export default SourcePieChart

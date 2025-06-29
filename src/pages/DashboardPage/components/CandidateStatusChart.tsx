import { ChartCard } from '@/components'
import { candidateStatusData } from '@/data/candidateStatus'
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
	return (
		<ChartCard title='Кандидаты по статусам'>
			<ResponsiveContainer width='100%' height={260}>
				<BarChart data={candidateStatusData} barSize={40}>
					<CartesianGrid strokeDasharray='3 3' vertical={false} />
					<XAxis dataKey='status' />
					<YAxis allowDecimals={false} />
					<Tooltip />
					<Bar dataKey='count'>
						{candidateStatusData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</ChartCard>
	)
}

export default CandidateStatusChart

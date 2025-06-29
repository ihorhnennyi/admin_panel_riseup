import ChartCard from '@/components/ChartCard'
import {
	recruiterActivityColors,
	recruiterActivityData,
} from '@/data/recruiterActivity'
import { useTheme } from '@mui/material'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const RecruiterActivityChart = () => {
	const theme = useTheme()
	const recruiters = Object.keys(recruiterActivityData[0]).filter(
		key => key !== 'date'
	)

	return (
		<ChartCard title='Активность рекрутеров'>
			<ResponsiveContainer width='100%' height={260}>
				<LineChart data={recruiterActivityData}>
					<CartesianGrid strokeDasharray='3 3' stroke={theme.palette.divider} />
					<XAxis dataKey='date' stroke={theme.palette.text.primary} />
					<YAxis allowDecimals={false} stroke={theme.palette.text.primary} />
					<Tooltip
						contentStyle={{
							backgroundColor: theme.palette.background.paper,
							border: `1px solid ${theme.palette.divider}`,
							color: theme.palette.text.primary,
						}}
					/>
					<Legend />
					{recruiters.map((name, index) => (
						<Line
							key={name}
							type='monotone'
							dataKey={name}
							stroke={
								recruiterActivityColors[index % recruiterActivityColors.length]
							}
							strokeWidth={2}
							dot={{ r: 3 }}
							activeDot={{ r: 6 }}
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
		</ChartCard>
	)
}

export default RecruiterActivityChart

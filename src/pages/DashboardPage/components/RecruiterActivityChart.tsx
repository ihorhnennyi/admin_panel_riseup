import { useTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
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

import ChartCard from '@/components/ChartCard'
import { useFiltersStorage } from '@/hooks/useFiltersStorage'
import { getRecruiterActivityChartData } from '@/services/analyticsService'

// Генерация уникального HEX-цвета на основе строки
const stringToColor = (str: string): string => {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}
	return `#${Math.abs(hash).toString(16).slice(0, 6).padStart(6, '0')}`
}

const RecruiterActivityChart = () => {
	const theme = useTheme()
	const { filters } = useFiltersStorage('statisticsFilters')
	const [chartData, setChartData] = useState<any[]>([])

	// Получение данных
	useEffect(() => {
		const fetchData = async () => {
			const result = await getRecruiterActivityChartData(filters)
			console.log('chart data:', result)
			setChartData(result)
		}

		fetchData()
	}, [filters])

	// Получение списка рекрутеров из ключей объекта (кроме "date")
	const recruiters = useMemo(() => {
		if (!chartData.length) return []
		return Object.keys(chartData[0]).filter(key => key !== 'date')
	}, [chartData])

	return (
		<ChartCard title='Активность рекрутеров'>
			<ResponsiveContainer width='100%' height={260}>
				<LineChart data={chartData}>
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
					{recruiters.map(name => (
						<Line
							key={name}
							type='monotone'
							dataKey={name}
							stroke={stringToColor(name)}
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

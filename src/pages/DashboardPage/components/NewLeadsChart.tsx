import ChartCard from '@/components/ChartCard'
import { leads30Days, leads7Days } from '@/data/newLeads'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const NewLeadsChart = () => {
	const [period, setPeriod] = useState<'7' | '30'>('7')

	const handleChange = (_: any, newValue: '7' | '30') => {
		if (newValue) setPeriod(newValue)
	}

	const data = period === '7' ? leads7Days : leads30Days

	return (
		<ChartCard title='Динамика новых лидов'>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				mb={2}
			>
				<ToggleButtonGroup
					value={period}
					exclusive
					onChange={handleChange}
					size='small'
					color='primary'
				>
					<ToggleButton value='7'>7 дней</ToggleButton>
					<ToggleButton value='30'>30 дней</ToggleButton>
				</ToggleButtonGroup>
			</Box>

			<ResponsiveContainer width='100%' height={240}>
				<AreaChart data={data}>
					<defs>
						<linearGradient id='colorLeads' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0%' stopColor='#42a5f5' stopOpacity={0.4} />
							<stop offset='100%' stopColor='#42a5f5' stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray='3 3' strokeOpacity={0.1} />
					<XAxis dataKey='date' />
					<YAxis allowDecimals={false} />
					<Tooltip />
					<Area
						type='monotone'
						dataKey='leads'
						stroke='#42a5f5'
						fill='url(#colorLeads)'
						strokeWidth={2}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</ChartCard>
	)
}

export default NewLeadsChart

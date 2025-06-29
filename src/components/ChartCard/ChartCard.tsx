import { Card, Typography } from '@mui/material'

interface ChartCardProps {
	title: string
	children: React.ReactNode
}

const ChartCard = ({ title, children }: ChartCardProps) => {
	return (
		<Card
			sx={{
				p: 2,
				boxShadow: 2,
				borderRadius: 2,
				minHeight: 320,
				width: '100%',
			}}
		>
			<Typography variant='h6' mb={2}>
				{title}
			</Typography>
			{children}
		</Card>
	)
}

export default ChartCard

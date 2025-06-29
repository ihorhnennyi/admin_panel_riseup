import { Box, Card, Typography, useTheme } from '@mui/material'
import { alpha, SxProps, Theme } from '@mui/material/styles'

interface StatCardProps {
	label: string
	value: number | string | React.ReactNode
	icon?: React.ReactNode
	color?: string
	sx?: SxProps<Theme>
}

const StatCard = ({ label, value, icon, color, sx }: StatCardProps) => {
	const theme = useTheme()

	return (
		<Card
			sx={{
				p: 2,
				display: 'flex',
				alignItems: 'center',
				gap: 1.5,
				borderRadius: 2,
				boxShadow: 2,
				...sx,
			}}
		>
			<Box
				sx={{
					backgroundColor: color
						? alpha(color, 0.1)
						: theme.palette.action.hover,
					color,
					p: 1,
					borderRadius: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					minWidth: 40,
					minHeight: 40,
				}}
			>
				{icon}
			</Box>
			<Box>
				<Typography variant='body2' color='text.secondary'>
					{label}
				</Typography>
				<Typography variant='h6' fontWeight={700} sx={{ color }}>
					{value}
				</Typography>
			</Box>
		</Card>
	)
}

export default StatCard

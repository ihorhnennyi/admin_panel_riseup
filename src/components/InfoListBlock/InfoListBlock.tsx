import { Box, Card, Typography, useTheme } from '@mui/material'

interface InfoItem {
	label: string
	value: number
	color?: string
}

interface InfoListBlockProps {
	title: string
	items: InfoItem[]
	width?: number | string
	maxHeight?: number
	maxVisibleItems?: number
}

const InfoListBlock = ({
	title,
	items,
	width = '100%',
	maxHeight = 300,
	maxVisibleItems = 6,
}: InfoListBlockProps) => {
	const theme = useTheme()
	const scrollNeeded = items.length > maxVisibleItems

	return (
		<Card
			sx={{
				width,
				height: maxHeight,
				borderRadius: 2,
				boxShadow: 2,
				display: 'flex',
				flexDirection: 'column',
				p: 2,
			}}
		>
			<Typography variant='h6' mb={2}>
				{title}
			</Typography>

			<Box
				sx={{
					flex: 1,
					overflowY: scrollNeeded ? 'auto' : 'hidden',
					scrollbarWidth: 'thin',
					pr: scrollNeeded ? 1 : 0,
					'&::-webkit-scrollbar': {
						width: 6,
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor:
							theme.palette.mode === 'dark'
								? 'rgba(255,255,255,0.2)'
								: 'rgba(0,0,0,0.2)',
						borderRadius: 3,
					},
				}}
			>
				{items.map(({ label, value, color = '#888888' }, index) => (
					<Box
						key={`${label}-${index}`}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							minHeight: 32,
							mb: 1,
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
							<Box
								sx={{
									width: 10,
									height: 10,
									borderRadius: '50%',
									backgroundColor: color,
								}}
							/>
							<Typography>{label}</Typography>
						</Box>

						<Typography fontWeight={600} sx={{ color }}>
							{value}
						</Typography>
					</Box>
				))}
			</Box>
		</Card>
	)
}

export default InfoListBlock

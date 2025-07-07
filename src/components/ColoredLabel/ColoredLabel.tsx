import { Box, Typography } from '@mui/material'

interface Props {
	label: string
	color?: string
}

const ColoredLabel = ({ label, color = '#ccc' }: Props) => {
	return (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='flex-start'
			height='100%' // важно для выравнивания по центру ячейки
			sx={{ pl: 1 }}
		>
			<Box
				sx={{
					width: 10,
					height: 10,
					borderRadius: '50%',
					bgcolor: color,
					mr: 1,
				}}
			/>
			<Typography variant='body2' lineHeight={1.2}>
				{label}
			</Typography>
		</Box>
	)
}

export default ColoredLabel

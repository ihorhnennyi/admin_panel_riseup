import { recruiterCardData } from '@/data/recruiterCard'
import {
	Avatar,
	Box,
	Divider,
	Paper,
	Stack,
	SxProps,
	Theme,
	Typography,
} from '@mui/material'

interface RecruiterCardProps {
	sx?: SxProps<Theme>
}

const RecruiterCard = ({ sx }: RecruiterCardProps) => {
	const { name, initial, description, leads, closed, rating } =
		recruiterCardData

	return (
		<Paper
			elevation={3}
			sx={{
				p: 3,
				mt: 2,
				borderRadius: 3,
				width: 300,
				height: 'fit-content',
				position: 'sticky',
				top: theme => theme.spacing(2),
				...sx,
			}}
		>
			<Stack spacing={2} alignItems='center'>
				<Avatar sx={{ width: 80, height: 80, fontSize: 32 }}>{initial}</Avatar>

				<Typography variant='h6' fontWeight={600}>
					{name}
				</Typography>

				<Typography
					variant='body2'
					color='text.secondary'
					align='center'
					sx={{ fontSize: 14 }}
				>
					{description}
				</Typography>

				<Divider sx={{ width: '100%', my: 1 }} />

				<Box sx={{ width: '100%' }}>
					<Stack spacing={0.5}>
						<Typography variant='body2'>
							Лидов: <strong>{leads}</strong>
						</Typography>
						<Typography variant='body2'>
							Закрыто: <strong>{closed}</strong>
						</Typography>
						<Typography variant='body2'>
							Рейтинг: <strong>{rating}</strong>
						</Typography>
					</Stack>
				</Box>
			</Stack>
		</Paper>
	)
}

export default RecruiterCard

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined'
import {
	Box,
	Button,
	IconButton,
	Paper,
	Typography,
	useTheme,
} from '@mui/material'

interface CrudListBlockProps<T> {
	title: string
	items: T[]
	itemLabel: (item: T) => string
	itemColor?: (item: T) => string
	onAdd: () => void
	onEdit?: (item: T) => void
	onDelete: (id: string) => void
	getId: (item: T) => string
}

const CrudListBlock = <T,>({
	title,
	items,
	itemLabel,
	itemColor,
	onAdd,
	onEdit,
	onDelete,
	getId,
}: CrudListBlockProps<T>) => {
	const theme = useTheme()
	const defaultItemBg =
		theme.palette.mode === 'dark'
			? theme.palette.grey[800]
			: theme.palette.grey[100]

	const hoverItemBg =
		theme.palette.mode === 'dark'
			? theme.palette.grey[700]
			: theme.palette.grey[200]

	return (
		<Paper
			elevation={3}
			sx={{
				borderRadius: 3,
				p: 2,
				width: 320,
				display: 'flex',
				flexDirection: 'column',
				bgcolor: 'background.paper',
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
				<Typography variant='h6'>{title}</Typography>
				<Button size='small' onClick={onAdd} variant='contained'>
					+ Добавить
				</Button>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					overflowY: 'auto',
					maxHeight: 360,
					pr: 1,
				}}
			>
				{items.length > 0 ? (
					items.map(item => {
						const rawColor = itemColor?.(item)
						const color =
							rawColor && rawColor.trim() !== '' ? rawColor : defaultItemBg

						return (
							<Box
								key={getId(item)}
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									p: 1.5,
									borderRadius: 2,
									bgcolor: color,
									transition: '0.2s ease',
									'&:hover': {
										boxShadow: 2,
										bgcolor: hoverItemBg,
									},
								}}
							>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<LocationOnOutlined fontSize='small' />
									<Typography>{itemLabel(item)}</Typography>
								</Box>
								<Box>
									{onEdit && (
										<IconButton size='small' onClick={() => onEdit(item)}>
											<EditIcon fontSize='small' />
										</IconButton>
									)}
									<IconButton
										size='small'
										color='error'
										onClick={() => onDelete(getId(item))}
									>
										<DeleteIcon fontSize='small' />
									</IconButton>
								</Box>
							</Box>
						)
					})
				) : (
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{
							mt: 2,
							textAlign: 'center',
							opacity: 0.7,
							fontStyle: 'italic',
						}}
					>
						Нет данных
					</Typography>
				)}
			</Box>
		</Paper>
	)
}

export default CrudListBlock

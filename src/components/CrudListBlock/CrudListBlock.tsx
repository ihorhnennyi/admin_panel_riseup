import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, IconButton, Typography } from '@mui/material'

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
	return (
		<Box
			sx={{
				border: '1px solid #444',
				borderRadius: 2,
				p: 2,
				width: 280,
				bgcolor: 'background.paper',
			}}
		>
			<Typography variant='h6' gutterBottom>
				{title}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					mb: 2,
					maxHeight: 300,
					overflowY: 'auto',
				}}
			>
				{items.map(item => {
					const color = itemColor ? itemColor(item) : '#eee'
					return (
						<Box
							key={getId(item)}
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								p: 1,
								borderRadius: 2,
								bgcolor: color,
								color: '#000',
							}}
						>
							<span>{itemLabel(item)}</span>
							<Box>
								{onEdit && (
									<IconButton size='small' onClick={() => onEdit(item)}>
										<EditIcon fontSize='small' />
									</IconButton>
								)}
								<IconButton size='small' onClick={() => onDelete(getId(item))}>
									<DeleteIcon fontSize='small' />
								</IconButton>
							</Box>
						</Box>
					)
				})}
			</Box>
			<Button variant='contained' fullWidth onClick={onAdd}>
				+ Добавить
			</Button>
		</Box>
	)
}

export default CrudListBlock

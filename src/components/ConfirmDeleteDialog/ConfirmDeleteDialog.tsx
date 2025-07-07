import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material'

interface Props {
	open: boolean
	title?: string
	description?: string
	onClose: () => void
	onConfirm: () => void
}

const ConfirmDeleteDialog = ({
	open,
	title = 'Удаление',
	description = 'Вы уверены, что хотите удалить этот элемент?',
	onClose,
	onConfirm,
}: Props) => {
	return (
		<Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Typography>{description}</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отмена</Button>
				<Button onClick={onConfirm} color='error' variant='contained'>
					Удалить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmDeleteDialog

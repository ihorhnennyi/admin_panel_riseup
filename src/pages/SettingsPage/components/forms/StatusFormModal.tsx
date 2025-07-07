import { createStatus, updateStatus } from '@/services/statusService'
import { CreateStatusDto, Status } from '@/types/status'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
	open: boolean
	initialData?: Status | null
	onClose: () => void
	onSave: (status: Status) => void
}

const StatusFormModal = ({ open, initialData, onClose, onSave }: Props) => {
	const { register, handleSubmit, reset } = useForm<CreateStatusDto>({
		defaultValues: {
			name: '',
			color: '#000000', // значение по умолчанию, чтобы не было пустой строки
			description: '',
		},
	})

	useEffect(() => {
		if (initialData) {
			reset({
				name: initialData.name,
				color: initialData.color || '#000000',
				description: initialData.description,
			})
		} else {
			reset({
				name: '',
				color: '#000000',
				description: '',
			})
		}
	}, [initialData, reset])

	const onSubmit = async (data: CreateStatusDto) => {
		try {
			let result: Status
			if (initialData?._id) {
				result = await updateStatus(initialData._id, data)
			} else {
				result = await createStatus(data)
			}
			onSave(result)
			onClose()
		} catch (error) {
			console.error('Ошибка при сохранении статуса:', error)
		}
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>
				{initialData ? 'Редактировать статус' : 'Добавить статус'}
			</DialogTitle>
			<DialogContent>
				<TextField
					label='Название'
					{...register('name')}
					fullWidth
					margin='normal'
				/>

				<Stack spacing={1} marginTop={2}>
					<Typography variant='body2' color='textSecondary'>
						Цвет
					</Typography>
					<input
						type='color'
						{...register('color')}
						style={{
							width: '100%',
							height: 40,
							border: 'none',
							padding: 0,
							background: 'none',
							cursor: 'pointer',
						}}
					/>
				</Stack>

				<TextField
					label='Описание'
					{...register('description')}
					fullWidth
					margin='normal'
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отмена</Button>
				<Button onClick={handleSubmit(onSubmit)} variant='contained'>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default StatusFormModal

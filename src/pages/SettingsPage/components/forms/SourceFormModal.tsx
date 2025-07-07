import { createSource, updateSource } from '@/services/sourceService'
import { CreateSourceDto, Source } from '@/types/source'
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
	initialData?: Source | null
	onClose: () => void
	onSave: (source: Source) => void
}

const SourceFormModal = ({ open, initialData, onClose, onSave }: Props) => {
	const { register, handleSubmit, reset } = useForm<CreateSourceDto>({
		defaultValues: {
			name: '',
			color: '#000000',
			description: '',
		},
	})

	useEffect(() => {
		if (initialData) {
			reset({
				name: initialData.name,
				color: initialData.color,
				description: initialData.description ?? '',
			})
		} else {
			reset({
				name: '',
				color: '#000000',
				description: '',
			})
		}
	}, [initialData, reset])

	const onSubmit = async (data: CreateSourceDto) => {
		try {
			let result: Source
			if (initialData?._id) {
				result = await updateSource(initialData._id, data)
			} else {
				result = await createSource(data)
			}
			onSave(result)
			onClose()
		} catch (error) {
			console.error('Ошибка при сохранении источника:', error)
		}
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>
				{initialData ? 'Редактировать источник' : 'Добавить источник'}
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

export default SourceFormModal

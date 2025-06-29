import { createStatus, updateStatus } from '@/services/statusService'
import { CreateStatusDto, Status } from '@/types/status'
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'

interface Props {
	open: boolean
	initialData?: Status | null
	onClose: () => void
	onSave: () => void
}

const StatusFormModal = ({ open, initialData, onClose, onSave }: Props) => {
	const { register, handleSubmit } = useForm<CreateStatusDto>({
		defaultValues: initialData ?? {
			name: '',
			color: '',
			description: '',
			order: 0,
			type: 'initial',
			isDefault: false,
			isActive: true,
		},
	})

	const onSubmit = async (data: CreateStatusDto) => {
		if (initialData?._id) {
			await updateStatus(initialData._id, data)
		} else {
			await createStatus(data)
		}
		onSave()
		onClose()
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
				<TextField
					label='Цвет'
					{...register('color')}
					fullWidth
					margin='normal'
				/>
				<TextField
					label='Описание'
					{...register('description')}
					fullWidth
					margin='normal'
				/>
				<TextField
					label='Порядок (order)'
					type='number'
					{...register('order', { valueAsNumber: true })}
					fullWidth
					margin='normal'
				/>
				<TextField
					label='Тип (initial | interview | final)'
					{...register('type')}
					fullWidth
					margin='normal'
				/>
				<FormControlLabel
					control={<Checkbox {...register('isDefault')} />}
					label='По умолчанию'
				/>
				<FormControlLabel
					control={<Checkbox {...register('isActive')} />}
					label='Активен'
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

import { City, CreateCityDto } from '@/types/city'
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
	initialData?: City | null
	onClose: () => void
	onSave: (newCity: CreateCityDto | City) => void
}

const CityFormModal = ({ open, initialData, onClose, onSave }: Props) => {
	const { register, handleSubmit, reset } = useForm<CreateCityDto>({
		defaultValues: {
			name: '',
			latitude: undefined,
			longitude: undefined,
			color: '#ff5733',
		},
	})

	useEffect(() => {
		if (initialData) {
			reset({
				name: initialData.name || '',
				latitude: initialData.latitude,
				longitude: initialData.longitude,
				color: initialData.color || '#ff5733',
			})
		} else {
			reset({
				name: '',
				latitude: undefined,
				longitude: undefined,
				color: '#ff5733',
			})
		}
	}, [initialData, reset])

	const onSubmit = (data: CreateCityDto) => {
		if (initialData?._id) {
			onSave({ ...data, _id: initialData._id })
		} else {
			onSave(data)
		}
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>
				{initialData ? 'Редактировать город' : 'Добавить город'}
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
					label='Широта'
					type='number'
					{...register('latitude')}
					fullWidth
					margin='normal'
				/>
				<TextField
					label='Долгота'
					type='number'
					{...register('longitude')}
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

export default CityFormModal

// import { createCity, updateCity } from '@/services/cityService'
import { City, CreateCityDto } from '@/types/city'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'

interface Props {
	open: boolean
	initialData?: City | null
	onClose: () => void
	onSave: (newCity: City) => void
}

const CityFormModal = ({ open, initialData, onClose, onSave }: Props) => {
	const { register, handleSubmit, reset } = useForm<CreateCityDto>({
		defaultValues: initialData ?? {
			name: '',
			latitude: undefined,
			longitude: undefined,
			color: '',
		},
	})

	// const onSubmit = async (data: CreateCityDto) => {
	// 	if (initialData?._id) {
	// 		await updateCity(initialData._id, data)
	// 	} else {
	// 		await createCity(data)
	// 	}
	// 	onSave()
	// 	onClose()
	// }

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
				<TextField
					label='Цвет'
					{...register('color')}
					fullWidth
					margin='normal'
				/>
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
				<Button
					// onClick={handleSubmit(onSubmit)}
					variant='contained'
				>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CityFormModal

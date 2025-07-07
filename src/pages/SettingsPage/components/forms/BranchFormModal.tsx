import { Branch, CreateBranchDto } from '@/types/branch'
import { City } from '@/types/city'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {
	open: boolean
	initialData?: Branch | null
	onClose: () => void
	onSave: (data: CreateBranchDto | (CreateBranchDto & { _id: string })) => void
	cities: City[]
}

const BranchFormModal = ({
	open,
	initialData,
	onClose,
	onSave,
	cities,
}: Props) => {
	const { register, handleSubmit, reset, control } = useForm<CreateBranchDto>({
		defaultValues: {
			name: '',
			description: '',
			city: '',
		},
	})

	useEffect(() => {
		if (initialData) {
			reset({
				name: initialData.name,
				description: initialData.description,
				city:
					typeof initialData.city === 'string'
						? initialData.city
						: (initialData.city as any)._id || '',
			})
		} else {
			reset({
				name: '',
				description: '',
				city: '',
			})
		}
	}, [initialData, reset])

	const onSubmit = (data: CreateBranchDto) => {
		if (initialData?._id) {
			onSave({ ...data, _id: initialData._id })
		} else {
			onSave(data)
		}
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>
				{initialData ? 'Редактировать филиал' : 'Добавить филиал'}
			</DialogTitle>
			<DialogContent>
				<TextField
					label='Название'
					{...register('name')}
					fullWidth
					margin='normal'
				/>
				<TextField
					label='Описание'
					{...register('description')}
					fullWidth
					margin='normal'
				/>

				<FormControl fullWidth margin='normal'>
					<InputLabel>Город</InputLabel>
					<Controller
						control={control}
						name='city'
						render={({ field }) => (
							<Select {...field} label='Город'>
								{cities.map(city => (
									<MenuItem key={city._id} value={city._id}>
										{city.name}
									</MenuItem>
								))}
							</Select>
						)}
					/>
				</FormControl>
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

export default BranchFormModal

import { useCities } from '@/hooks/useCities'
import { useSources } from '@/hooks/useSources'
import { useStatuses } from '@/hooks/useStatuses'
import { Candidate, CreateCandidateDto } from '@/types/candidate'
import {
	Button,
	CircularProgress,
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
import { useEffect, useState } from 'react'

interface CandidateFormModalProps {
	open: boolean
	initialData?: Candidate
	onClose: () => void
	onSave: (
		data: CreateCandidateDto | (CreateCandidateDto & { _id: string })
	) => Promise<void> // <-- вот тут
}

const CandidateFormModal = ({
	open,
	initialData,
	onClose,
	onSave,
}: CandidateFormModalProps) => {
	const { statuses } = useStatuses()
	const { cities } = useCities()
	const { sources } = useSources()

	const [formData, setFormData] = useState<CreateCandidateDto>({
		firstName: '',
		lastName: '',
		middleName: '',
		email: '',
		phone: '',
		age: undefined,
		position: '',
		salary: undefined,
		gender: '',
		employmentType: '',
		description: '',
		status: '',
		city: '',
		source: '',
		isActive: true,
	})

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!statuses.length || !cities.length || !sources.length) return

		if (initialData) {
			setFormData({
				firstName: initialData.firstName ?? '',
				lastName: initialData.lastName ?? '',
				middleName: initialData.middleName ?? '',
				email: initialData.email ?? '',
				phone: initialData.phone ?? '',
				age: initialData.age ?? undefined,
				position: initialData.position ?? '',
				salary: initialData.salary ?? undefined,
				gender: initialData.gender ?? '',
				employmentType: initialData.employmentType ?? '',
				description: initialData.description ?? '',
				status:
					typeof initialData.status === 'object'
						? initialData.status._id ?? ''
						: initialData.status,
				city:
					typeof initialData.city === 'object'
						? initialData.city._id ?? ''
						: initialData.city,
				source:
					typeof initialData.source === 'object'
						? initialData.source._id ?? ''
						: initialData.source,
				isActive: initialData.isActive ?? true,
			})
		} else {
			// Полностью пустая форма
			setFormData({
				firstName: '',
				lastName: '',
				middleName: '',
				email: '',
				phone: '',
				age: undefined,
				position: '',
				salary: undefined,
				gender: '',
				employmentType: '',
				description: '',
				status: '',
				city: '',
				source: '',
				isActive: true,
			})
		}
	}, [initialData, open, statuses, cities, sources])

	const handleChange = (field: keyof CreateCandidateDto, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleSave = async () => {
		setLoading(true)

		if (
			formData.email &&
			!/^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i.test(formData.email)
		) {
			alert('Введите корректный email')
			setLoading(false)
			return
		}

		try {
			await onSave(
				initialData?._id ? { ...formData, _id: initialData._id } : formData
			)
			onClose()
		} catch (error) {
			console.error('Ошибка при сохранении кандидата:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>
				{initialData ? 'Редактировать кандидата' : 'Добавить кандидата'}
			</DialogTitle>

			<DialogContent
				sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
			>
				<TextField
					label='Имя'
					value={formData.firstName}
					onChange={e => handleChange('firstName', e.target.value)}
					size='small'
					fullWidth
				/>
				<TextField
					label='Фамилия'
					value={formData.lastName}
					onChange={e => handleChange('lastName', e.target.value)}
					size='small'
					fullWidth
				/>
				<TextField
					label='Отчество'
					value={formData.middleName}
					onChange={e => handleChange('middleName', e.target.value)}
					size='small'
					fullWidth
				/>
				<TextField
					label='Email'
					value={formData.email}
					onChange={e => handleChange('email', e.target.value)}
					size='small'
					fullWidth
				/>
				<TextField
					label='Телефон'
					value={formData.phone}
					onChange={e => handleChange('phone', e.target.value)}
					size='small'
					fullWidth
				/>
				<TextField
					label='Возраст'
					type='number'
					value={formData.age ?? ''}
					onChange={e => handleChange('age', Number(e.target.value))}
					size='small'
					fullWidth
				/>
				<TextField
					label='Позиция'
					value={formData.position}
					onChange={e => handleChange('position', e.target.value)}
					size='small'
					fullWidth
				/>
				<TextField
					label='Желаемая зарплата'
					type='number'
					value={formData.salary ?? ''}
					onChange={e => handleChange('salary', Number(e.target.value))}
					size='small'
					fullWidth
				/>
				<TextField
					label='Пол'
					value={formData.gender}
					onChange={e => handleChange('gender', e.target.value)}
					size='small'
					fullWidth
				/>
				<TextField
					label='Тип занятости'
					value={formData.employmentType}
					onChange={e => handleChange('employmentType', e.target.value)}
					size='small'
					fullWidth
				/>
				<TextField
					label='Описание'
					value={formData.description}
					onChange={e => handleChange('description', e.target.value)}
					size='small'
					fullWidth
					multiline
					rows={2}
				/>

				<FormControl size='small' fullWidth>
					<InputLabel>Статус</InputLabel>
					<Select
						value={formData.status}
						label='Статус'
						onChange={e => handleChange('status', e.target.value)}
					>
						{statuses.map(s => (
							<MenuItem key={s._id} value={s._id}>
								{s.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl size='small' fullWidth>
					<InputLabel>Город</InputLabel>
					<Select
						value={formData.city}
						label='Город'
						onChange={e => handleChange('city', e.target.value)}
					>
						{cities.map(c => (
							<MenuItem key={c._id} value={c._id}>
								{c.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl size='small' fullWidth>
					<InputLabel>Источник</InputLabel>
					<Select
						value={formData.source}
						label='Источник'
						onChange={e => handleChange('source', e.target.value)}
					>
						{sources.map(src => (
							<MenuItem key={src._id} value={src._id}>
								{src.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</DialogContent>

			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button onClick={onClose} disabled={loading}>
					Отмена
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={handleSave}
					disabled={!formData.firstName || !formData.status || loading}
					startIcon={
						loading ? <CircularProgress size={20} color='inherit' /> : undefined
					}
				>
					{loading ? 'Сохраняем...' : 'Сохранить'}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CandidateFormModal

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

interface CandidateData {
	id?: number
	name: string
	status: string
	city: string
	source: string
}

interface CandidateFormModalProps {
	open: boolean
	initialData?: CandidateData
	onClose: () => void
	onSave: (data: CandidateData) => void
}

const statuses = ['Новый', 'В работе', 'Интервью', 'Отказ', 'Принят']
const sources = ['Telegram', 'Instagram', 'Реклама', 'Сайт']

const CandidateFormModal = ({
	open,
	initialData,
	onClose,
	onSave,
}: CandidateFormModalProps) => {
	const [formData, setFormData] = useState<CandidateData>({
		name: '',
		status: 'Новый',
		city: '',
		source: 'Telegram',
	})

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (initialData) {
			setFormData(initialData)
		} else {
			setFormData({
				name: '',
				status: 'Новый',
				city: '',
				source: 'Telegram',
			})
		}
	}, [initialData, open])

	const handleChange = (field: keyof CandidateData, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleSave = () => {
		setLoading(true)
		setTimeout(() => {
			onSave(formData)
			setLoading(false)
			onClose()
		}, 1000) // имитация запроса
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth='sm'
			fullWidth
			PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
		>
			<DialogTitle sx={{ fontWeight: 600 }}>
				{initialData ? 'Редактировать кандидата' : 'Добавить кандидата'}
			</DialogTitle>

			<DialogContent
				sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
			>
				<TextField
					label='Имя'
					value={formData.name}
					onChange={e => handleChange('name', e.target.value)}
					fullWidth
					size='small'
				/>

				<FormControl size='small' fullWidth>
					<InputLabel>Статус</InputLabel>
					<Select
						value={formData.status}
						label='Статус'
						onChange={e => handleChange('status', e.target.value)}
					>
						{statuses.map(status => (
							<MenuItem key={status} value={status}>
								{status}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<TextField
					label='Город'
					value={formData.city}
					onChange={e => handleChange('city', e.target.value)}
					fullWidth
					size='small'
				/>

				<FormControl size='small' fullWidth>
					<InputLabel>Источник</InputLabel>
					<Select
						value={formData.source}
						label='Источник'
						onChange={e => handleChange('source', e.target.value)}
					>
						{sources.map(source => (
							<MenuItem key={source} value={source}>
								{source}
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
					disabled={!formData.name || loading}
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

import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

interface ExportField {
	label: string
	value: string
}

interface ExportModalProps {
	open: boolean
	onClose: () => void
	onExport: (fields: string[]) => void
	fields: ExportField[]
}

const ExportModal = ({ open, onClose, onExport, fields }: ExportModalProps) => {
	const [selectedFields, setSelectedFields] = useState<string[]>(
		fields.map(f => f.value)
	)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (open) {
			setSelectedFields(fields.map(f => f.value))
		}
	}, [open, fields])

	const toggleField = (value: string) => {
		setSelectedFields(prev =>
			prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
		)
	}

	const handleExport = () => {
		setLoading(true)
		setTimeout(() => {
			onExport(selectedFields)
			setLoading(false)
			onClose()
		}, 1000)
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth='sm'
			fullWidth
			PaperProps={{
				sx: { borderRadius: 3, p: 1 },
			}}
		>
			<DialogTitle sx={{ fontWeight: 600 }}>Экспортировать данные</DialogTitle>

			<DialogContent sx={{ mt: 1 }}>
				<Typography variant='body2' color='text.secondary' mb={2}>
					Выберите поля для экспорта:
				</Typography>

				<Box display='flex' flexWrap='wrap' justifyContent='flex-start' gap={2}>
					{fields.map(field => (
						<Box key={field.value} flex='1 1 45%' minWidth='200px'>
							<FormControlLabel
								control={
									<Checkbox
										checked={selectedFields.includes(field.value)}
										onChange={() => toggleField(field.value)}
									/>
								}
								label={field.label}
							/>
						</Box>
					))}
				</Box>
			</DialogContent>

			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button onClick={onClose} disabled={loading}>
					Отмена
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={handleExport}
					disabled={selectedFields.length === 0 || loading}
					startIcon={
						loading ? <CircularProgress size={20} color='inherit' /> : undefined
					}
				>
					{loading ? 'Экспортируем...' : 'Экспортировать'}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ExportModal

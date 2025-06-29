import { createBranch, updateBranch } from '@/services/branchService'
import { Branch, CreateBranchDto } from '@/types/branch'
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
	initialData?: Branch | null
	onClose: () => void
	onSave: () => void
}

const BranchFormModal = ({ open, initialData, onClose, onSave }: Props) => {
	const { register, handleSubmit, reset } = useForm<CreateBranchDto>({
		defaultValues: initialData ?? {
			name: '',
			description: '',
			city: '', // id города
		},
	})

	const onSubmit = async (data: CreateBranchDto) => {
		if (initialData?._id) {
			await updateBranch(initialData._id, data)
		} else {
			await createBranch(data)
		}
		onSave()
		onClose()
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
				<TextField
					label='ID города'
					{...register('city')}
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

export default BranchFormModal

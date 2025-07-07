import UserFormModal from '@/components/UserFormModal'
import { useAuth } from '@/context/AuthProvider'
import { useUsers } from '@/hooks/useUsers'
import { CreateUserDto, User } from '@/types/user'
import { getRoleLabel } from '@/utils/roles'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
	Avatar,
	Box,
	Divider,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface UserMenuProps {
	user: User
}

const UserMenu = ({ user }: UserMenuProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [openEditModal, setOpenEditModal] = useState(false)

	const open = Boolean(anchorEl)
	const { handleSave } = useUsers()
	const { logout } = useAuth()
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = async () => {
		handleClose()
		await logout()
		navigate('/')
	}

	const handleEdit = () => {
		handleClose()
		setOpenEditModal(true)
	}

	const handleModalClose = () => {
		setOpenEditModal(false)
	}

	const handleModalSave = async (data: CreateUserDto & { _id?: string }) => {
		try {
			await handleSave(data)
			enqueueSnackbar('Данные успешно сохранены', { variant: 'success' })
			handleModalClose()
		} catch (error) {
			console.error(error)
			enqueueSnackbar('Ошибка при сохранении', { variant: 'error' })
		}
	}

	return (
		<>
			<Stack
				direction='row'
				alignItems='center'
				spacing={1}
				sx={{ cursor: 'pointer' }}
				onClick={handleOpen}
				aria-haspopup='true'
				aria-controls='user-menu'
			>
				<Avatar sx={{ width: 32, height: 32 }} src={user.photoUrl || undefined}>
					{user.name?.[0]?.toUpperCase() || '?'}
				</Avatar>

				<Box display={{ xs: 'none', sm: 'block' }}>
					<Typography variant='body2' fontWeight={500}>
						{user.name}
					</Typography>
					<Typography variant='caption' color='text.secondary'>
						{getRoleLabel(user.role)}
					</Typography>
				</Box>
				<ArrowDropDownIcon />
			</Stack>

			<Menu
				id='user-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<MenuItem onClick={handleEdit}>Настройки</MenuItem>
				<Divider />
				<MenuItem onClick={handleLogout}>Выйти</MenuItem>
			</Menu>

			<UserFormModal
				open={openEditModal}
				initialData={user}
				onClose={handleModalClose}
				onSave={handleModalSave}
			/>
		</>
	)
}

export default UserMenu

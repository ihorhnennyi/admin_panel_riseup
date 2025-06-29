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
import { useState } from 'react'

interface User {
	name: string
	role: string
}

interface UserMenuProps {
	user: User
}

const UserMenu = ({ user }: UserMenuProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		handleClose()
		console.log('Выход из аккаунта')
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
				<Avatar sx={{ width: 32, height: 32 }}>{user.name[0]}</Avatar>
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
				<MenuItem onClick={handleClose}>Профиль</MenuItem>
				<MenuItem onClick={handleClose}>Настройки</MenuItem>
				<Divider />
				<MenuItem onClick={handleLogout}>Выйти</MenuItem>
			</Menu>
		</>
	)
}

export default UserMenu

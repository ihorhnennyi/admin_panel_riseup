import { Logo, ToggleTheme, UserMenu } from '@/components'
import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/SidebarContext'
import { getRoleLabelGenitive } from '@/utils/roles'
import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	Box,
	IconButton,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material'

const Header = () => {
	const { toggleSidebar } = useSidebar()
	const { user } = useAuth()

	return (
		<AppBar
			position='static'
			color='default'
			elevation={0}
			sx={{
				borderBottom: theme => `1px solid ${theme.palette.divider}`,
				backgroundColor: theme => theme.palette.background.paper,
			}}
		>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				{/* Левая часть — кнопка меню и роль */}
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<IconButton onClick={toggleSidebar} edge='start' color='inherit'>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						Панель {user?.role ? getRoleLabelGenitive(user.role) : ''}
					</Typography>
				</Box>

				{/* Центр — логотип */}
				<Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
					<Logo title='Rise UP' />
				</Box>

				{/* Правая часть — переключатель темы и меню пользователя */}
				<Stack direction='row' alignItems='center' spacing={2}>
					<ToggleTheme />
					{user && ['admin', 'recruiter'].includes(user.role) && (
						<UserMenu
							user={{ ...user, role: user.role as 'admin' | 'recruiter' }}
						/>
					)}
				</Stack>
			</Toolbar>
		</AppBar>
	)
}

export default Header

import { Logo, ToggleTheme, UserMenu } from '@/components'
import { useSidebar } from '@/context/SidebarContext'
import { getRoleLabel } from '@/utils/roles'
import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	Box,
	IconButton,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material'

const user = {
	name: 'Игорь',
	role: 'admin',
}

const Header = () => {
	const { toggleSidebar } = useSidebar()

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
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<IconButton onClick={toggleSidebar} edge='start' color='inherit'>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						Панель {getRoleLabel(user.role)}
					</Typography>
				</Box>

				<Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
					<Logo title='Rise UP' />
				</Box>

				<Stack direction='row' alignItems='center' spacing={2}>
					{/* <SearchBar /> */}
					{/* <Notifications /> */}
					<ToggleTheme />
					<UserMenu user={user} />
				</Stack>
			</Toolbar>
		</AppBar>
	)
}

export default Header

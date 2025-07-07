import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/SidebarContext'
import * as Icons from '@mui/icons-material'
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
	useTheme,
} from '@mui/material'
import { routes } from '@routes/index'
import { NavLink } from 'react-router-dom'

const renderIcon = (iconName?: string) => {
	if (!iconName) return null
	const IconComponent = Icons[iconName as keyof typeof Icons]
	return IconComponent ? <IconComponent fontSize='small' /> : null
}

const Sidebar = () => {
	const theme = useTheme()
	const { collapsed } = useSidebar()
	const { user } = useAuth()
	const userRole = user?.role

	return (
		<Box
			sx={{
				width: collapsed ? 80 : 240,
				bgcolor: theme.palette.background.default,
				flexShrink: 0,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				borderRight: `1px solid ${theme.palette.divider}`,
				transition: 'width 0.3s ease',
			}}
		>
			<List>
				{routes
					.filter(
						route =>
							route.showInSidebar !== false &&
							route.private &&
							userRole &&
							route.roles?.includes(userRole)
					)
					.map(route => (
						<NavLink
							to={route.path}
							key={route.path}
							style={({ isActive }) => ({
								textDecoration: 'none',
								color: 'inherit',
							})}
						>
							{({ isActive }) => (
								<ListItemButton
									selected={isActive}
									sx={{
										px: collapsed ? 2 : 3,
										bgcolor: isActive
											? theme.palette.action.selected
											: 'transparent',
										'&:hover': {
											bgcolor: theme.palette.action.hover,
										},
									}}
								>
									{route.icon && (
										<Tooltip
											title={collapsed ? route.name : ''}
											placement='right'
										>
											<ListItemIcon
												sx={{
													color: 'inherit',
													minWidth: 0,
													mr: collapsed ? 0 : 2,
												}}
											>
												{renderIcon(route.icon)}
											</ListItemIcon>
										</Tooltip>
									)}
									{!collapsed && <ListItemText primary={route.name} />}
								</ListItemButton>
							)}
						</NavLink>
					))}
			</List>
		</Box>
	)
}

export default Sidebar

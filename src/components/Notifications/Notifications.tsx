import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { Badge, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'

const mockNotifications = [
	{ id: 1, text: 'Новый кандидат добавлен' },
	{ id: 2, text: 'Обновлены настройки системы' },
]

const Notifications = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleNotificationClick = (id: number) => {
		console.log('Открыть уведомление:', id)
		handleClose()
	}

	return (
		<>
			<IconButton
				onClick={handleOpen}
				aria-label='Уведомления'
				aria-controls='notifications-menu'
				aria-haspopup='true'
			>
				<Badge
					badgeContent={
						mockNotifications.length > 99 ? '99+' : mockNotifications.length
					}
					color='error'
				>
					<NotificationsNoneIcon />
				</Badge>
			</IconButton>

			<Menu
				id='notifications-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				{mockNotifications.length > 0 ? (
					mockNotifications.map(n => (
						<MenuItem key={n.id} onClick={() => handleNotificationClick(n.id)}>
							<Typography variant='body2'>{n.text}</Typography>
						</MenuItem>
					))
				) : (
					<MenuItem disabled>
						<Typography variant='body2' color='text.secondary'>
							Нет уведомлений
						</Typography>
					</MenuItem>
				)}
			</Menu>
		</>
	)
}

export default Notifications

import { Header, Sidebar } from '@/layouts'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<Box display='flex' flexDirection='column' height='100vh'>
			<Header />
			<Box display='flex' flex={1} overflow='hidden'>
				<Sidebar />
				<Box
					component='main'
					role='main'
					flex={1}
					p={2}
					overflow='auto'
					sx={{
						bgcolor: 'background.default',
						color: 'text.primary',
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</Box>
	)
}

export default Layout

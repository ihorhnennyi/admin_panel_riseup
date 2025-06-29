import { Header, Sidebar } from '@/layouts'
import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface LayoutProps {
	children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<Box display='flex' flexDirection='column' height='100vh'>
			<Header />
			<Box display='flex' flex={1} overflow='hidden'>
				<Sidebar />
				<Box component='main' role='main' flex={1} p={2} overflow='auto'>
					{children}
				</Box>
			</Box>
		</Box>
	)
}

export default Layout

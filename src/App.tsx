import { SidebarProvider } from '@/context/SidebarContext'
import { Layout } from '@/layouts'
import AppRouter from '@/routes/AppRouter'

const App = () => {
	return (
		<SidebarProvider>
			<Layout>
				<AppRouter />
			</Layout>
		</SidebarProvider>
	)
}

export default App

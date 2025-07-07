import { AuthProvider } from '@/context/AuthProvider' // ✅ Добавлено
import { SidebarProvider } from '@/context/SidebarContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<SidebarProvider>
					<SnackbarProvider maxSnack={3} autoHideDuration={3000}>
						<AuthProvider>
							<App />
						</AuthProvider>
					</SnackbarProvider>
				</SidebarProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
)

import { darkTheme, lightTheme } from '@/theme/theme'
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface ThemeContextProps {
	toggleTheme: () => void
	mode: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextProps>({
	toggleTheme: () => {},
	mode: 'light',
})

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState<'light' | 'dark'>(() => {
		const stored = localStorage.getItem('themeMode')
		return stored === 'dark' ? 'dark' : 'light'
	})

	const toggleTheme = () => {
		setMode(prev => {
			const newValue = prev === 'light' ? 'dark' : 'light'
			localStorage.setItem('themeMode', newValue)
			return newValue
		})
	}

	useEffect(() => {
		const stored = localStorage.getItem('themeMode')
		if (stored === 'dark' || stored === 'light') {
			setMode(stored)
		}
	}, [])

	const theme = useMemo(
		() => (mode === 'light' ? lightTheme : darkTheme),
		[mode]
	)

	return (
		<ThemeContext.Provider value={{ toggleTheme, mode }}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	)
}

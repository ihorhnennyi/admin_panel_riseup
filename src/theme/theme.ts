import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#1976b2',
		},
		background: {
			default: '#f4f6f8',
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					scrollbarColor: '#c1c1c1 transparent',
					scrollbarWidth: 'thin',
					'&::-webkit-scrollbar': {
						width: 8,
						height: 8,
					},
					'&::-webkit-scrollbar-track': {
						background: 'transparent',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#c1c1c1',
						borderRadius: 8,
						border: '2px solid transparent',
						backgroundClip: 'content-box',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#a8a8a8',
					},
				},
			},
		},
	},
})
export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9',
		},
		background: {
			default: '#121212',
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					scrollbarColor: '#555 transparent',
					scrollbarWidth: 'thin',
					'&::-webkit-scrollbar': {
						width: 8,
						height: 8,
					},
					'&::-webkit-scrollbar-track': {
						background: 'transparent',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#555',
						borderRadius: 8,
						border: '2px solid transparent',
						backgroundClip: 'content-box',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#777',
					},
				},
			},
		},
	},
})

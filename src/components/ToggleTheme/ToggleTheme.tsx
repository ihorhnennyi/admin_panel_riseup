import { useThemeContext } from '@/context/ThemeContext'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'

interface ToggleThemeProps {
	sx?: SxProps<Theme>
}

const ToggleTheme = ({ sx }: ToggleThemeProps) => {
	const { toggleTheme, mode } = useThemeContext()

	return (
		<IconButton
			onClick={toggleTheme}
			color='inherit'
			aria-label='Переключить тему'
			sx={sx}
		>
			{mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
		</IconButton>
	)
}

export default ToggleTheme

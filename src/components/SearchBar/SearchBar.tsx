import SearchIcon from '@mui/icons-material/Search'
import { Box, InputBase, SxProps, Theme } from '@mui/material'

interface SearchBarProps {
	placeholder?: string
	value?: string
	onChange?: (value: string) => void
	sx?: SxProps<Theme>
}

const SearchBar: React.FC<SearchBarProps> = ({
	placeholder = 'Поиск...',
	value = '',
	onChange,
	sx,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				bgcolor: theme => theme.palette.action.hover,
				px: 1.5,
				py: 0.5,
				borderRadius: 2,
				minWidth: 200,
				...sx,
			}}
		>
			<SearchIcon sx={{ fontSize: 20, mr: 1 }} />
			<InputBase
				fullWidth
				value={value}
				placeholder={placeholder}
				onChange={e => onChange?.(e.target.value)}
				inputProps={{ 'aria-label': 'Поиск' }}
			/>
		</Box>
	)
}

export default SearchBar

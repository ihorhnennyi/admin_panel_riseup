import { Box, TextField } from '@mui/material'

interface RecruitersFiltersProps {
	search: string
	onSearchChange: (value: string) => void
}

const RecruitersFilters = ({
	search,
	onSearchChange,
}: RecruitersFiltersProps) => {
	return (
		<Box display='flex' flexWrap='wrap' gap={2} mb={3}>
			<TextField
				label='Поиск рекрутера'
				variant='outlined'
				value={search}
				onChange={e => onSearchChange(e.target.value)}
				size='small'
			/>
		</Box>
	)
}

export default RecruitersFilters

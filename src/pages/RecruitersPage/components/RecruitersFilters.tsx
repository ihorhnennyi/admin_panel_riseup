import { Box, TextField } from '@mui/material'
import { useState } from 'react'

const RecruitersFilters = () => {
	const [search, setSearch] = useState('')

	return (
		<Box display='flex' flexWrap='wrap' gap={2} mb={3}>
			<TextField
				label='Поиск рекрутера'
				variant='outlined'
				value={search}
				onChange={e => setSearch(e.target.value)}
				size='small'
			/>
		</Box>
	)
}

export default RecruitersFilters

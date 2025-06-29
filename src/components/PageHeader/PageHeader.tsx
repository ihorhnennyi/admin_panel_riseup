import { Box, Stack, Typography } from '@mui/material'

interface PageHeaderProps {
	title: string
	actions?: React.ReactNode
}

const PageHeader = ({ title, actions }: PageHeaderProps) => {
	return (
		<Box mb={3}>
			<Stack direction='row' alignItems='center' justifyContent='space-between'>
				<Typography variant='h5'>{title}</Typography>
				{actions && (
					<Stack direction='row' spacing={1}>
						{actions}
					</Stack>
				)}
			</Stack>
		</Box>
	)
}

export default PageHeader

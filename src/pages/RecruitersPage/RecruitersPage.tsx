import PageHeader from '@/components/PageHeader'
import { Button, Container } from '@mui/material'
import RecruitersFilters from './components/RecruitersFilters'
import RecruitersTable from './components/RecruitersTable'

const RecruitersPage = () => {
	return (
		<Container maxWidth={false}>
			<PageHeader
				title='Рекрутеры'
				actions={
					<Button variant='contained' color='primary'>
						Добавить рекрутера
					</Button>
				}
			/>

			<RecruitersFilters />
			<RecruitersTable />
		</Container>
	)
}

export default RecruitersPage

import { PageHeader } from '@/components'
import { Box, Container } from '@mui/material'
import CandidateStatusChart from './components/CandidateStatusChart'
import InfoListBlockGroup from './components/InfoListBlockGroup'
import NewLeadsChart from './components/NewLeadsChart'
import SourcePieChart from './components/SourcePieChart'
import StatCardsBlock from './components/StatCardsBlock'

const DashboardPage = () => {
	return (
		<Container maxWidth={false}>
			<PageHeader title='Dashboard' />

			<Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
				<Box sx={{ flex: 1 }}>
					<StatCardsBlock />

					<Box mt={3}>
						<InfoListBlockGroup />
					</Box>

					<Box mt={3} display='flex' flexWrap='wrap' gap={2}>
						<NewLeadsChart />
					</Box>

					<Box mt={3} display='flex' flexWrap='wrap' gap={2} width='100%'>
						<CandidateStatusChart />
					</Box>

					<Box
						mt={3}
						display='flex'
						flexWrap='wrap'
						justifyContent='space-between'
						gap={2}
					>
						<Box flex='1 1 100%' minWidth={300}>
							<SourcePieChart />
						</Box>
						{/* <Box flex='1 1 48%' minWidth={300}>
							<RecruiterActivityChart />
						</Box> */}
					</Box>
				</Box>

				{/* <RecruiterCard /> */}
			</Box>
		</Container>
	)
}

export default DashboardPage

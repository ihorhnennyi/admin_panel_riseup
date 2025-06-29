import PageHeader from '@/components/PageHeader'
import { Button, Container } from '@mui/material'
import { useState } from 'react'
import CandidateFormModal from './components/CandidateFormModal'
import CandidatesFilters from './components/CandidatesFilters'
import CandidatesTable from './components/CandidatesTable'

const CandidatesPage = () => {
	const [formOpen, setFormOpen] = useState(false)
	const [editingCandidate, setEditingCandidate] = useState<any | undefined>(
		undefined
	)

	return (
		<Container maxWidth={false}>
			<PageHeader
				title='Кандидаты'
				actions={
					<Button
						variant='contained'
						color='primary'
						onClick={() => {
							setEditingCandidate(undefined)
							setFormOpen(true)
						}}
					>
						Добавить кандидата
					</Button>
				}
			/>

			<CandidatesFilters />
			<CandidatesTable
				onEditCandidate={candidate => {
					setEditingCandidate(candidate)
					setFormOpen(true)
				}}
			/>

			<CandidateFormModal
				open={formOpen}
				initialData={editingCandidate}
				onClose={() => setFormOpen(false)}
				onSave={data => {
					console.log('Saved candidate:', data)
					setFormOpen(false)
					// TODO: вызывать API, обновлять таблицу
				}}
			/>
		</Container>
	)
}

export default CandidatesPage

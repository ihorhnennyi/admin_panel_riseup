// SettingsPage.tsx
import { Container } from '@mui/material'
import { useState } from 'react'

import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import PageHeader from '@/components/PageHeader'
import BranchFormModal from './components/forms/BranchFormModal'
import CityFormModal from './components/forms/CityFormModal'
import SourceFormModal from './components/forms/SourceFormModal'
import StatusFormModal from './components/forms/StatusFormModal'
import SettingsBlocks from './components/SettingsBlocks'

import { Branch } from '@/types/branch'
import { City } from '@/types/city'
import { SettingsBlockConfig } from '@/types/settings'
import { Source } from '@/types/source'
import { Status } from '@/types/status'

import { useBranches } from '@/hooks/useBranches'
import { useCities } from '@/hooks/useCities'
import { useSources } from '@/hooks/useSources'
import { useStatuses } from '@/hooks/useStatuses'

const SettingsPage = () => {
	const {
		cities,
		handleSave: handleSaveCity,
		handleDelete: handleDeleteCity,
	} = useCities()

	const {
		statuses,
		handleSave: handleSaveStatus,
		handleDelete: handleDeleteStatus,
	} = useStatuses()

	const {
		branches,
		handleSave: handleSaveBranch,
		handleDelete: handleDeleteBranch,
	} = useBranches()

	const {
		sources,
		handleSave: handleSaveSource,
		handleDelete: handleDeleteSource,
	} = useSources()

	const [selectedCity, setSelectedCity] = useState<City | null>(null)
	const [selectedStatus, setSelectedStatus] = useState<Status | null>(null)
	const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
	const [selectedSource, setSelectedSource] = useState<Source | null>(null)

	const [openCityModal, setOpenCityModal] = useState(false)
	const [openStatusModal, setOpenStatusModal] = useState(false)
	const [openBranchModal, setOpenBranchModal] = useState(false)
	const [openSourceModal, setOpenSourceModal] = useState(false)

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [deleteTarget, setDeleteTarget] = useState<{
		id: string
		type: 'city' | 'status' | 'branch' | 'source'
		name: string
	} | null>(null)

	const handleConfirmDelete = async () => {
		if (!deleteTarget) return

		switch (deleteTarget.type) {
			case 'city':
				await handleDeleteCity(deleteTarget.id)
				break
			case 'status':
				await handleDeleteStatus(deleteTarget.id)
				break
			case 'branch':
				await handleDeleteBranch(deleteTarget.id)
				break
			case 'source':
				await handleDeleteSource(deleteTarget.id)
				break
		}

		setDeleteDialogOpen(false)
		setDeleteTarget(null)
	}

	const blocks: SettingsBlockConfig<any>[] = [
		{
			title: 'Города',
			items: cities,
			itemLabel: item => item.name,
			getId: item => item._id,
			onAdd: () => {
				setSelectedCity(null)
				setOpenCityModal(true)
			},
			onEdit: city => {
				setSelectedCity(city)
				setOpenCityModal(true)
			},
			onDelete: id => {
				const name = cities.find(c => c._id === id)?.name || ''
				setDeleteTarget({ id, type: 'city', name })
				setDeleteDialogOpen(true)
			},
		},
		{
			title: 'Статусы',
			items: statuses,
			itemLabel: item => item.name,
			itemColor: item => item.color,
			getId: item => item._id,
			onAdd: () => {
				setSelectedStatus(null)
				setOpenStatusModal(true)
			},
			onEdit: status => {
				setSelectedStatus(status)
				setOpenStatusModal(true)
			},
			onDelete: id => {
				const name = statuses.find(s => s._id === id)?.name || ''
				setDeleteTarget({ id, type: 'status', name })
				setDeleteDialogOpen(true)
			},
		},
		{
			title: 'Филиалы',
			items: branches,
			itemLabel: item => item.name,
			getId: item => item._id,
			onAdd: () => {
				setSelectedBranch(null)
				setOpenBranchModal(true)
			},
			onEdit: branch => {
				setSelectedBranch(branch)
				setOpenBranchModal(true)
			},
			onDelete: id => {
				const name = branches.find(b => b._id === id)?.name || ''
				setDeleteTarget({ id, type: 'branch', name })
				setDeleteDialogOpen(true)
			},
		},
		{
			title: 'Источники',
			items: sources,
			itemLabel: item => item.name,
			itemColor: item => item.color,
			getId: item => item._id,
			onAdd: () => {
				setSelectedSource(null)
				setOpenSourceModal(true)
			},
			onEdit: source => {
				setSelectedSource(source)
				setOpenSourceModal(true)
			},
			onDelete: id => {
				const name = sources.find(s => s._id === id)?.name || ''
				setDeleteTarget({ id, type: 'source', name })
				setDeleteDialogOpen(true)
			},
		},
	]

	return (
		<Container maxWidth={false}>
			<PageHeader title='Настройки' />

			<SettingsBlocks blocks={blocks} />

			<CityFormModal
				open={openCityModal}
				initialData={selectedCity}
				onClose={() => setOpenCityModal(false)}
				onSave={async city => {
					await handleSaveCity(city)
					setOpenCityModal(false)
				}}
			/>

			<StatusFormModal
				open={openStatusModal}
				initialData={selectedStatus}
				onClose={() => setOpenStatusModal(false)}
				onSave={async status => {
					await handleSaveStatus(status)
					setOpenStatusModal(false)
				}}
			/>

			<BranchFormModal
				open={openBranchModal}
				initialData={selectedBranch}
				onClose={() => setOpenBranchModal(false)}
				onSave={async branch => {
					await handleSaveBranch(branch)
					setOpenBranchModal(false)
				}}
				cities={cities}
			/>

			<SourceFormModal
				open={openSourceModal}
				initialData={selectedSource}
				onClose={() => setOpenSourceModal(false)}
				onSave={async source => {
					await handleSaveSource(source)
					setOpenSourceModal(false)
				}}
			/>

			<ConfirmDeleteDialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
				onConfirm={handleConfirmDelete}
				title='Подтвердите удаление'
				description={`Вы уверены, что хотите удалить “${deleteTarget?.name}”?`}
			/>
		</Container>
	)
}

export default SettingsPage

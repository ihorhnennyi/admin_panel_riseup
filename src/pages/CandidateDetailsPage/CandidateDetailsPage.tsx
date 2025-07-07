import {
	Avatar,
	Box,
	Button,
	Chip,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useCandidates } from '@/hooks/useCandidates'
import { getCandidate } from '@/services/candidatesService'
import { Candidate, CreateCandidateDto } from '@/types/candidate'
import { CandidatesFiltersData } from '@/types/filters'
import CandidateFormModal from './components/CandidateFormModal'

const CandidateDetailsPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { handleDelete, handleSave } = useCandidates()

	const [candidate, setCandidate] = useState<Candidate | null>(null)
	const [editOpen, setEditOpen] = useState(false)

	const emptyFilters: CandidatesFiltersData = {
		city: '',
		status: '',
		source: '',
		search: '',
		recruiter: '',
		dateRange: [null, null],
	}

	useEffect(() => {
		if (!id) return
		getCandidate(id)
			.then(setCandidate)
			.catch(err => {
				console.error('Ошибка при загрузке кандидата:', err)
				navigate('/candidates')
			})
	}, [id, navigate])

	const handleRemove = async () => {
		if (!candidate?._id) return
		const confirmed = window.confirm('Удалить кандидата?')
		if (!confirmed) return
		await handleDelete(candidate._id, 0, 10, emptyFilters)
		navigate('/candidates')
	}

	const handleUpdate = async (
		data: CreateCandidateDto | (CreateCandidateDto & { _id: string })
	) => {
		if ('_id' in data) {
			const saved = await handleSave(data, 0, 10, emptyFilters)
			if (saved) {
				setCandidate(saved)
				setEditOpen(false)
			}
		} else {
			console.error('Обновление кандидата требует _id')
		}
	}

	if (!candidate) return null

	const {
		firstName,
		lastName,
		phone,
		status,
		source,
		city,
		createdBy,
		createdAt,
	} = candidate

	const getNameAndColor = (value: any): { name: string; color: string } => {
		if (typeof value === 'object' && value !== null) {
			return {
				name: value.name ?? '',
				color: value.color ?? '#ccc',
			}
		}
		return { name: '', color: '#ccc' }
	}

	const { name: statusName, color: statusColor } = getNameAndColor(status)
	const { name: cityName } = getNameAndColor(city)
	const { name: sourceName, color: sourceColor } = getNameAndColor(source)

	const recruiterName =
		typeof createdBy === 'object' && createdBy !== null
			? `${createdBy.name} ${createdBy.lastName ?? ''}`
			: ''

	const recruiterInitial =
		typeof createdBy === 'object' && createdBy !== null
			? createdBy.name?.[0] ?? '?'
			: '?'

	return (
		<Box p={3}>
			<Button
				variant='text'
				onClick={() => navigate('/candidates')}
				sx={{ mb: 2 }}
			>
				← Назад к кандидатам
			</Button>

			<Paper elevation={3} sx={{ p: 4 }}>
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					justifyContent='space-between'
					alignItems={{ xs: 'flex-start', sm: 'center' }}
					gap={2}
					mb={3}
				>
					<Box>
						<Typography variant='h5' fontWeight={600}>
							{firstName} {lastName}
						</Typography>
						<Typography color='text.secondary'>{phone}</Typography>
					</Box>

					<Stack direction='row' gap={2} flexWrap='wrap'>
						<Button variant='outlined' onClick={() => setEditOpen(true)}>
							Редактировать
						</Button>
						<Button variant='outlined' color='error' onClick={handleRemove}>
							Удалить
						</Button>
					</Stack>
				</Stack>

				<Stack spacing={2}>
					<Info label='Статус'>
						<Chip label={statusName} sx={{ backgroundColor: statusColor }} />
					</Info>

					<Info label='Город'>
						<Typography>{cityName}</Typography>
					</Info>

					<Info label='Источник'>
						<Chip
							label={sourceName}
							sx={{ backgroundColor: sourceColor, color: '#fff' }}
						/>
					</Info>

					<Info label='Рекрутер'>
						<Stack direction='row' alignItems='center' spacing={1}>
							<Avatar sx={{ width: 24, height: 24 }}>{recruiterInitial}</Avatar>
							<Typography>{recruiterName}</Typography>
						</Stack>
					</Info>

					<Info label='Дата создания'>
						<Typography>
							{createdAt ? new Date(createdAt).toLocaleString() : 'Неизвестно'}
						</Typography>
					</Info>

					<Info label='Email'>
						<Typography>{candidate.email || '—'}</Typography>
					</Info>

					<Info label='Отчество'>
						<Typography>{candidate.middleName || '—'}</Typography>
					</Info>

					<Info label='Описание статуса'>
						<Typography>
							{(typeof status === 'object' && status?.description) || '—'}
						</Typography>
					</Info>

					<Info label='Дата обновления'>
						<Typography>
							{candidate.updatedAt
								? new Date(candidate.updatedAt).toLocaleString()
								: '—'}
						</Typography>
					</Info>

					<Info label='Email рекрутера'>
						<Typography>
							{typeof createdBy === 'object' && createdBy?.email
								? createdBy.email
								: '—'}
						</Typography>
					</Info>
				</Stack>
			</Paper>

			<CandidateFormModal
				open={editOpen}
				initialData={candidate}
				onClose={() => setEditOpen(false)}
				onSave={handleUpdate}
			/>
		</Box>
	)
}

export default CandidateDetailsPage

const Info = ({
	label,
	children,
}: {
	label: string
	children: React.ReactNode
}) => (
	<Stack direction='row' spacing={1}>
		<Typography fontWeight={500} width={120}>
			{label}:
		</Typography>
		<Box>{children}</Box>
	</Stack>
)

import { StatCard } from '@/components'
import { statCardsDataConfig } from '@/data/statCardsData'
import { getBranches } from '@/services/branchService'
import { getCities } from '@/services/cityService'
import { getSources } from '@/services/sourceService'
import { getStatuses } from '@/services/statusService'
import * as Icons from '@mui/icons-material'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

const StatCardsBlock = () => {
	const [cityCount, setCityCount] = useState(0)
	const [branchCount, setBranchCount] = useState(0)
	const [statusCount, setStatusCount] = useState(0)
	const [sourceCount, setSourceCount] = useState(0) // ← добавить

	useEffect(() => {
		const loadData = async () => {
			try {
				const [cities, branches, statuses, sources] = await Promise.all([
					getCities(),
					getBranches(),
					getStatuses(),
					getSources(),
				])
				setCityCount(cities.length)
				setBranchCount(branches.length)
				setStatusCount(statuses.length)
				setSourceCount(sources.length) // ← добавить
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}

		loadData()
	}, [])

	const getIconByName = (iconName?: string) => {
		const IconComponent = Icons[iconName as keyof typeof Icons]
		return IconComponent ? <IconComponent /> : <Icons.Info />
	}

	const statCardsData = statCardsDataConfig.map(config => ({
		label: config.label,
		value: config.getValue({
			cityCount,
			branchCount,
			statusCount,
			sourceCount, // ← добавить
		}),
		iconName: config.iconName,
	}))

	return (
		<Box
			display='grid'
			gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))'
			gap={2}
			mt={2}
		>
			{statCardsData.map(stat => (
				<StatCard
					key={stat.label}
					{...stat}
					icon={getIconByName(stat.iconName)}
				/>
			))}
		</Box>
	)
}
export default StatCardsBlock

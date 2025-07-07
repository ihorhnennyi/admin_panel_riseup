// src/widgets/InfoListBlockGroup.tsx
import { InfoListBlock } from '@/components'
import { useCandidatesAnalytics } from '@/hooks/useCandidatesAnalytics'
import { Box } from '@mui/material'

const InfoListBlockGroup = () => {
	const { statuses, cities, sources } = useCandidatesAnalytics()

	const analyticsBlocks = [
		{ title: 'Кандидаты по статусам', items: statuses },
		{ title: 'Кандидаты по городам', items: cities },
		{ title: 'Кандидаты по источникам', items: sources },
	]

	return (
		<Box
			display='grid'
			gridTemplateColumns='repeat(2, minmax(0, 1fr))'
			columnGap={4}
			rowGap={3}
		>
			{analyticsBlocks.map(block => (
				<InfoListBlock
					key={block.title}
					title={block.title}
					items={block.items}
					maxHeight={300}
					maxVisibleItems={6}
				/>
			))}
		</Box>
	)
}

export default InfoListBlockGroup

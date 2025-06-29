import { StatCard } from '@/components'
import { statCardsData } from '@/data/statCards'
import * as Icons from '@mui/icons-material'
import { Box } from '@mui/material'

const StatCardsBlock = () => {
	const getIconByName = (iconName?: string) => {
		const IconComponent = Icons[iconName as keyof typeof Icons]
		return IconComponent ? <IconComponent /> : <Icons.Info />
	}

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

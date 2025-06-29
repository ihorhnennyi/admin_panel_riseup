import { InfoListBlock } from '@/components'
import { analyticsBlocks } from '@/data/analyticsBlocks'
import { Box } from '@mui/material'

interface InfoListBlockGroupProps {
	columns?: number
	columnGap?: number
	rowGap?: number
}

const InfoListBlockGroup = ({
	columns = 2,
	columnGap = 4,
	rowGap = 3,
}: InfoListBlockGroupProps) => {
	return (
		<Box
			display='grid'
			gridTemplateColumns={`repeat(${columns}, minmax(0, 1fr))`}
			columnGap={columnGap}
			rowGap={rowGap}
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

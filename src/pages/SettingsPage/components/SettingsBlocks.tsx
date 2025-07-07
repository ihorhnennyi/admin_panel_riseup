// components/SettingsBlocks.tsx
import { CrudListBlock } from '@/components'
import { SettingsBlockConfig } from '@/types/settings'
import { Box } from '@mui/material'

interface Props {
	blocks: SettingsBlockConfig<any>[]
}

const SettingsBlocks = ({ blocks }: Props) => {
	return (
		<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
			{blocks.map((block, index) => (
				<CrudListBlock
					key={index}
					title={block.title}
					items={block.items}
					itemLabel={block.itemLabel}
					itemColor={block.itemColor}
					onAdd={block.onAdd}
					onEdit={block.onEdit}
					onDelete={block.onDelete}
					getId={block.getId}
				/>
			))}
		</Box>
	)
}

export default SettingsBlocks

// types/settings.ts
export interface SettingsBlockConfig<T> {
	title: string
	items: T[]
	itemLabel: (item: T) => string
	getId: (item: T) => string
	itemColor?: (item: T) => string
	onAdd: () => void
	onEdit: (item: T) => void
	onDelete: (id: string) => void
}

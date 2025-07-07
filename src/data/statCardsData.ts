export interface StatCardConfig {
	label: string
	iconName: string
	getValue: (data: {
		cityCount: number
		branchCount: number
		statusCount: number
		sourceCount: number
	}) => number
}

export const statCardsDataConfig: StatCardConfig[] = [
	{
		label: 'Города',
		iconName: 'LocationCity',
		getValue: ({ cityCount }) => cityCount,
	},
	{
		label: 'Филиалы',
		iconName: 'Domain',
		getValue: ({ branchCount }) => branchCount,
	},
	{
		label: 'Статусы',
		iconName: 'Label',
		getValue: ({ statusCount }) => statusCount,
	},
	{
		label: 'Источники',
		iconName: 'Source',
		getValue: ({ sourceCount }) => sourceCount,
	},
]

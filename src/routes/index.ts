export interface AppRoute {
	path: string
	name: string
	element: string
	lazy?: boolean
	icon?: string
	description?: string
	layout?: 'main' | 'auth'
	roles?: string[]
	private?: boolean
	showInSidebar?: boolean
}

export const routes: AppRoute[] = [
	{
		path: '/dashboard',
		name: 'Дашборд',
		element: 'DashboardPage',
		lazy: true,
		icon: 'Dashboard',
		description: 'Общая сводка по системе',
		layout: 'main',
		roles: ['admin', 'recruiter'],
		private: true,
		showInSidebar: true,
	},
	{
		path: '/candidates',
		name: 'Кандидаты',
		element: 'CandidatesPage',
		lazy: true,
		icon: 'PeopleAlt',
		description: 'Список и управление кандидатами',
		layout: 'main',
		roles: ['admin', 'recruiter'],
		private: true,
		showInSidebar: true,
	},
	{
		path: '/recruiters',
		name: 'Рекрутеры',
		element: 'RecruitersPage',
		lazy: true,
		icon: 'Group',
		description: 'Список рекрутеров',
		layout: 'main',
		roles: ['admin'],
		private: true,
		showInSidebar: true,
	},
	{
		path: '/settings',
		name: 'Настройки',
		element: 'SettingsPage',
		lazy: true,
		icon: 'Settings',
		description: 'Конфигурация и параметры системы',
		layout: 'main',
		roles: ['admin'],
		private: true,
		showInSidebar: true,
	},
	{
		path: '/statistics',
		name: 'Статистика',
		element: 'StatisticsPage',
		lazy: true,
		icon: 'BarChart',
		description: 'Аналитика и отчёты',
		layout: 'main',
		roles: ['admin'],
		private: true,
		showInSidebar: true,
	},

	{
		path: '/candidates/:id',
		name: 'Кандидат',
		element: 'CandidateDetailsPage',
		lazy: true,
		icon: 'PeopleAlt',
		description: 'Список и управление кандидатами',
		layout: 'main',
		roles: ['admin', 'recruiter'],
		private: true,
		showInSidebar: false,
	},
	{
		path: '/',
		name: 'Вход',
		element: 'LoginPage',
		lazy: true,
		icon: 'Dashboard',
		layout: 'auth',
		private: false,
		showInSidebar: false,
	},
]

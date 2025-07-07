import { lazy } from 'react'

export const lazyPages = {
	DashboardPage: lazy(() => import('@/pages/DashboardPage')),
	CandidatesPage: lazy(() => import('@/pages/CandidatesPage')),
	RecruitersPage: lazy(() => import('@/pages/RecruitersPage')),
	SettingsPage: lazy(() => import('@/pages/SettingsPage')),
	StatisticsPage: lazy(() => import('@/pages/StatisticsPage')),
	CandidateDetailsPage: lazy(() => import('@/pages/CandidateDetailsPage')),
	LoginPage: lazy(() => import('@/pages/LoginPage')),
}

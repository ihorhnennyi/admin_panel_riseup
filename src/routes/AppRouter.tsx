import { AuthLayout, Layout } from '@/layouts'
import { NotFoundPage } from '@/pages'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './index'
import { lazyPages } from './lazyPages'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				{/* Auth layout */}
				<Route element={<AuthLayout />}>
					{routes
						.filter(route => route.layout === 'auth')
						.map(route => {
							const Page = lazyPages[route.element as keyof typeof lazyPages]
							return (
								<Route key={route.path} path={route.path} element={<Page />} />
							)
						})}
				</Route>

				{/* Main layout */}
				<Route element={<Layout />}>
					{routes
						.filter(route => route.layout !== 'auth')
						.map(route => {
							const Page = lazyPages[route.element as keyof typeof lazyPages]

							const element = route.private ? (
								<PrivateRoute>
									<Page />
								</PrivateRoute>
							) : (
								<Page />
							)

							return (
								<Route key={route.path} path={route.path} element={element} />
							)
						})}
				</Route>

				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	)
}

export default AppRouter

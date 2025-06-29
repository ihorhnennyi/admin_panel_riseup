import { NotFoundPage } from '@/pages'
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './index'

const loadPage = (name: string) =>
	lazy(() => import(/* @vite-ignore */ `../pages/${name}`))

const AppRouter = () => {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				{routes.map(({ path, element, lazy: isLazy }) => {
					const Component = isLazy ? loadPage(element) : element
					return <Route key={path} path={path} element={<Component />} />
				})}

				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	)
}

export default AppRouter

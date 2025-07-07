import { useAuth } from '@/context/AuthProvider'
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface Props {
	children: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
	const { isAuthenticated, isLoading } = useAuth()
	const location = useLocation()

	if (isLoading) return <div>Загрузка...</div>

	if (!isAuthenticated) {
		return (
			<Navigate
				to={`/?redirect=${encodeURIComponent(location.pathname)}`}
				replace
			/>
		)
	}

	return <>{children}</>
}

export default PrivateRoute

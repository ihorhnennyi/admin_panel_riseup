import { getMe, login as loginRequest } from '@/services/authService'
import { clearTokens } from '@/services/tokenService'
import { LoginDto } from '@/types/auth'
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface User {
	_id: string
	email: string
	name: string
	role: string
}

interface AuthContextProps {
	user: User | null
	setUser: (user: User | null) => void
	isAuthenticated: boolean
	isLoading: boolean
	login: (dto: LoginDto) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	setUser: () => {},
	isAuthenticated: false,
	isLoading: true,
	login: async () => {},
	logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const navigate = useNavigate()
	const location = useLocation()

	const fetchUser = useCallback(async () => {
		try {
			const data = await getMe()
			setUser(data as User)
			return true
		} catch (err) {
			setUser(null)
			clearTokens()

			// редиректим на логин, если токены невалидны
			if (location.pathname !== '/' && location.pathname !== '/login') {
				navigate(`/?redirect=${encodeURIComponent(location.pathname)}`, {
					replace: true,
				})
			}
			return false
		} finally {
			setIsLoading(false)
		}
	}, [navigate, location.pathname])

	const login = async (dto: LoginDto) => {
		await loginRequest(dto)
		const success = await fetchUser()
		if (success) {
			const redirectTo =
				new URLSearchParams(window.location.search).get('redirect') ??
				'/dashboard'
			navigate(redirectTo, { replace: true })
		}
	}

	const logout = () => {
		clearTokens()
		setUser(null)
		navigate('/login', { replace: true })
	}

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		const refreshToken = localStorage.getItem('refreshToken')

		if (accessToken || refreshToken) {
			fetchUser()
		} else {
			setIsLoading(false)
		}
	}, [fetchUser])

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				isAuthenticated: !!user,
				isLoading,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

import { useAuth } from '@/context/AuthProvider'
import { LoginDto } from '@/types/auth'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
	const { login } = useAuth()
	const { enqueueSnackbar } = useSnackbar()
	const navigate = useNavigate()

	const handleLogin = async (data: LoginDto) => {
		console.log('📤 login form submitted', data)
		try {
			await login(data)
			enqueueSnackbar('Успешный вход!', { variant: 'success' })
			navigate('/dashboard')
		} catch (error) {
			console.error('❌ Ошибка при логине:', error)
			enqueueSnackbar('Ошибка при входе. Проверьте данные.', {
				variant: 'error',
			})
		}
	}

	return { handleLogin }
}

import { useLogin } from '@/hooks/useLogin'
import { LoginDto } from '@/types/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup.object().shape({
	email: yup.string().email('Неверный email').required('Email обязателен'),
	password: yup
		.string()
		.min(6, 'Минимум 6 символов')
		.required('Пароль обязателен'),
})

const LoginPage = () => {
	const theme = useTheme()
	const [showPassword, setShowPassword] = useState(false)
	const { handleLogin } = useLogin()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const redirect = searchParams.get('redirect') || '/dashboard'

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginDto>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	})

	const autofillFix = {
		'& input:-webkit-autofill': {
			boxShadow: `0 0 0 1000px ${
				theme.palette.mode === 'dark' ? '#1e1e1e' : '#f9f9f9'
			} inset`,
			WebkitTextFillColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
			transition: 'background-color 5000s ease-in-out 0s',
		},
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#f5f7fa',
				backgroundImage:
					theme.palette.mode === 'dark'
						? 'linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)'
						: 'linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%)',
				p: 2,
			}}
		>
			<motion.div
				initial={{ opacity: 0, y: 30, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<Paper
					elevation={6}
					sx={{
						p: 5,
						width: '100%',
						minWidth: 450,
						maxWidth: 600,
						borderRadius: 4,
						boxShadow: theme.shadows[8],
					}}
				>
					<Stack spacing={3}>
						<Typography variant='h4' fontWeight={700} textAlign='center'>
							RiseUp CRM
						</Typography>
						<Typography
							variant='body1'
							textAlign='center'
							color='text.secondary'
						>
							Добро пожаловать 👋 <br />
							Введите данные для входа
						</Typography>

						<form onSubmit={handleSubmit(handleLogin)}>
							<Stack spacing={2}>
								<Controller
									name='email'
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label='Email'
											type='email'
											error={!!errors.email}
											helperText={errors.email?.message}
											fullWidth
											sx={{
												bgcolor:
													theme.palette.mode === 'dark' ? '#1e1e1e' : '#f9f9f9',
												borderRadius: 2,
												'& .MuiOutlinedInput-root': {
													transition: 'all 0.2s',
													'&:hover': {
														boxShadow:
															theme.palette.mode === 'dark'
																? '0 0 0 2px rgba(255,255,255,0.1)'
																: '0 0 0 2px rgba(0,0,0,0.04)',
													},
													'&.Mui-focused fieldset': {
														borderColor: theme.palette.primary.main,
													},
												},
												...autofillFix,
											}}
										/>
									)}
								/>

								<Controller
									name='password'
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label='Пароль'
											type={showPassword ? 'text' : 'password'}
											error={!!errors.password}
											helperText={errors.password?.message}
											fullWidth
											InputProps={{
												endAdornment: (
													<InputAdornment position='end'>
														<IconButton
															onClick={() => setShowPassword(prev => !prev)}
															edge='end'
														>
															{showPassword ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
											sx={{
												bgcolor:
													theme.palette.mode === 'dark' ? '#1e1e1e' : '#f9f9f9',
												borderRadius: 2,
												'& .MuiOutlinedInput-root': {
													transition: 'all 0.2s',
													'&:hover': {
														boxShadow:
															theme.palette.mode === 'dark'
																? '0 0 0 2px rgba(255,255,255,0.1)'
																: '0 0 0 2px rgba(0,0,0,0.04)',
													},
													'&.Mui-focused fieldset': {
														borderColor: theme.palette.primary.main,
													},
												},
												...autofillFix,
											}}
										/>
									)}
								/>

								<Button
									type='submit'
									variant='contained'
									fullWidth
									size='large'
									disabled={isSubmitting}
									sx={{ mt: 1 }}
								>
									{isSubmitting ? 'Вход...' : 'Войти'}
								</Button>
							</Stack>
						</form>

						<Box textAlign='center'>
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{
									cursor: 'pointer',
									'&:hover': { textDecoration: 'underline' },
								}}
							>
								Забыли пароль?
							</Typography>
						</Box>
					</Stack>
				</Paper>
			</motion.div>
		</Box>
	)
}

export default LoginPage

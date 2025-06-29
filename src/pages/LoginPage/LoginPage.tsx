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
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
	email: yup.string().email('Неверный email').required('Email обязателен'),
	password: yup
		.string()
		.min(6, 'Минимум 6 символов')
		.required('Пароль обязателен'),
})

interface LoginFormInputs {
	email: string
	password: string
}

const LoginPage = () => {
	const theme = useTheme()
	const [showPassword, setShowPassword] = useState(false)

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormInputs>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: LoginFormInputs) => {
		console.log('Login attempt', data)
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: theme.palette.background.default,
				p: 2,
			}}
		>
			<Paper
				elevation={3}
				sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: 3 }}
			>
				<Stack spacing={2}>
					<Typography variant='h5' textAlign='center' fontWeight={600}>
						Вход в систему RiseUp
					</Typography>

					<form onSubmit={handleSubmit(onSubmit)}>
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
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								)}
							/>

							<Button
								type='submit'
								variant='contained'
								fullWidth
								disabled={isSubmitting}
							>
								Войти
							</Button>
						</Stack>
					</form>

					<Box textAlign='center'>
						<Typography variant='body2' color='text.secondary'>
							Забыли пароль?
						</Typography>
					</Box>
				</Stack>
			</Paper>
		</Box>
	)
}

export default LoginPage

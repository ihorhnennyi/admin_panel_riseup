import { useAuth } from '@/context/AuthProvider'
import { useBranches } from '@/hooks/useBranches'
import { useCities } from '@/hooks/useCities'
import { CreateUserDto } from '@/types/user'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {
	open: boolean
	initialData?: Partial<CreateUserDto> & { _id?: string }
	onClose: () => void
	onSave: (data: CreateUserDto & { _id?: string }) => Promise<void>
}

const UserFormModal = ({ open, initialData, onClose, onSave }: Props) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateUserDto>({
		defaultValues: {
			email: '',
			name: '',
			password: '',
			role: 'recruiter',
			isActive: true,
		},
	})

	const { user: currentUser } = useAuth()
	const isAdmin = currentUser?.role === 'admin'

	const [showPassword, setShowPassword] = useState(false)
	const [submitError, setSubmitError] = useState('')

	const { cities } = useCities()
	const { branches } = useBranches()

	useEffect(() => {
		if (open) {
			reset({
				...initialData,
				city: (initialData?.city as any)?._id ?? initialData?.city ?? '',
				branch: (initialData?.branch as any)?._id ?? initialData?.branch ?? '',
				password: '',
			})
			setSubmitError('')
		}
	}, [open, initialData, reset])

	const onSubmit = async (data: CreateUserDto) => {
		setSubmitError('')
		try {
			const cleanedData = {
				...data,
				...(data.password ? {} : { password: undefined }), // убираем пароль, если пустой
			}

			if (initialData?._id) {
				await onSave({ ...cleanedData, _id: initialData._id })
			} else {
				await onSave(cleanedData)
				reset()
			}
		} catch (error: any) {
			if (
				error.response?.data?.message?.includes('email') &&
				error.response.data.message.includes('already exists')
			) {
				setSubmitError('Пользователь с таким email уже существует')
			} else {
				setSubmitError('Ошибка при сохранении рекрутера')
			}
		}
	}

	const passwordRules = useMemo(() => {
		if (initialData?._id) return undefined
		return {
			required: 'Пароль обязателен',
			minLength: { value: 6, message: 'Минимум 6 символов' },
		}
	}, [initialData])

	const renderField = (
		name: keyof CreateUserDto,
		label: string,
		type: string = 'text',
		multiline = false,
		rows?: number
	) => (
		<Box mb={2}>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						value={field.value ?? ''}
						type={type}
						label={label}
						fullWidth
						multiline={multiline}
						rows={rows}
						error={!!errors[name]}
						helperText={errors[name]?.message as string}
						InputLabelProps={type === 'date' ? { shrink: true } : undefined}
					/>
				)}
			/>
		</Box>
	)

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
			<DialogTitle>
				{initialData ? 'Редактировать рекрутера' : 'Добавить рекрутера'}
			</DialogTitle>
			<DialogContent>
				<Box component='form' onSubmit={handleSubmit(onSubmit)}>
					{renderField('email', 'Email')}
					{renderField('name', 'Имя')}
					{renderField('lastName', 'Фамилия')}
					{renderField('middleName', 'Отчество')}
					{renderField('phone', 'Телефон')}

					<Box mb={2}>
						<Controller
							name='password'
							control={control}
							rules={passwordRules ?? { required: false }}
							render={({ field }) => (
								<TextField
									{...field}
									value={field.value ?? ''}
									label='Пароль'
									type={showPassword ? 'text' : 'password'}
									fullWidth
									error={!!errors.password}
									helperText={
										errors.password?.message ||
										(initialData?._id
											? 'Оставьте пустым, если не хотите менять'
											: '')
									}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton
													onClick={() => setShowPassword(p => !p)}
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
					</Box>

					{isAdmin && (
						<Box mb={2}>
							<Controller
								control={control}
								name='role'
								render={({ field }) => (
									<FormControl fullWidth>
										<InputLabel>Роль</InputLabel>
										<Select {...field} label='Роль'>
											<MenuItem value='recruiter'>Рекрутер</MenuItem>
											<MenuItem value='admin'>Админ</MenuItem>
										</Select>
									</FormControl>
								)}
							/>
						</Box>
					)}

					{isAdmin && (
						<Box mb={2}>
							<Controller
								control={control}
								name='isActive'
								render={({ field }) => (
									<FormControlLabel
										control={<Checkbox {...field} checked={field.value} />}
										label='Активен'
									/>
								)}
							/>
						</Box>
					)}

					{renderField('telegram', 'Telegram')}
					{renderField('viber', 'Viber')}
					{renderField('whatsapp', 'WhatsApp')}
					{renderField('facebook', 'Facebook')}
					{renderField('description', 'Описание', 'text', true, 2)}
					{renderField('position', 'Позиция')}
					{renderField('birthDate', 'Дата рождения', 'date')}

					<Box mb={2}>
						<Controller
							control={control}
							name='city'
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel>Город</InputLabel>
									<Select {...field} value={field.value ?? ''} label='Город'>
										{cities.map(city => (
											<MenuItem key={city._id} value={city._id}>
												{city.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
						/>
					</Box>

					<Box mb={2}>
						<Controller
							control={control}
							name='branch'
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel>Филиал</InputLabel>
									<Select {...field} value={field.value ?? ''} label='Филиал'>
										{branches.map(branch => (
											<MenuItem key={branch._id} value={branch._id}>
												{branch.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
						/>
					</Box>

					{renderField('linkedinUrl', 'LinkedIn URL')}
					{renderField('identificationNumber', 'ИНН')}
					{renderField('emergencyContact', 'Контакт при ЧС')}
					{renderField('photoUrl', 'URL фото')}

					{submitError && (
						<Typography color='error' mt={2}>
							{submitError}
						</Typography>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отмена</Button>
				<Button onClick={handleSubmit(onSubmit)} variant='contained'>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default UserFormModal

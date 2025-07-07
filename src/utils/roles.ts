export const getRoleLabel = (role: string) => {
	switch (role) {
		case 'admin':
			return 'Администратор'
		case 'recruiter':
			return 'Рекрутер'
		default:
			return role
	}
}

export const getRoleLabelGenitive = (role: string) => {
	switch (role) {
		case 'admin':
			return 'Администратора'
		case 'recruiter':
			return 'Рекрутера'
		default:
			return role
	}
}

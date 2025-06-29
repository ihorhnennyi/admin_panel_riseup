export const getRoleLabel = (role: string) => {
	switch (role) {
		case 'admin':
			return 'Администратора'
		case 'recruiter':
			return 'Рекрутера'
		default:
			return role
	}
}

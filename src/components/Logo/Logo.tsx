import { Typography } from '@mui/material'

const Logo = ({ title }: { title?: string }) => {
	return (
		<Typography
			variant='h5'
			component='div'
			sx={{
				fontWeight: 700,
				background: 'linear-gradient(270deg, #4f46e5, #9333ea, #4f46e5)',
				backgroundSize: '600% 600%',
				WebkitBackgroundClip: 'text',
				WebkitTextFillColor: 'transparent',
				animation: 'gradientShift 6s ease infinite',
				textAlign: 'center',
				letterSpacing: 1.2,
				'@keyframes gradientShift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
			}}
		>
			{title}
		</Typography>
	)
}

export default Logo

import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const __dirname = process.cwd()

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Admin Panel',
				short_name: 'Admin',
				start_url: '/',
				display: 'standalone',
				background_color: '#111827',
				theme_color: '#111827',
				icons: [
					{
						src: '/favicon.ico',
						sizes: '64x64 32x32 24x24 16x16',
						type: 'image/x-icon',
					},
					{
						src: '/apple-touch-icon.png',
						sizes: '180x180',
						type: 'image/png',
					},
				],
			},

			workbox: {
				maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@routes': path.resolve(__dirname, './src/routes'),
			'@theme': path.resolve(__dirname, './src/theme'),
			'@layouts': path.resolve(__dirname, './src/layouts'),
			'@context': path.resolve(__dirname, './src/contest'),
			'@data': path.resolve(__dirname, './src/data'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@services': path.resolve(__dirname, './src/services'),
			'@types': path.resolve(__dirname, './src/types'),
		},
	},
})

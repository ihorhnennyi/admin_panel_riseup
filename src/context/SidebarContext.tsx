import { createContext, useContext, useEffect, useState } from 'react'

interface SidebarContextProps {
	collapsed: boolean
	toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps>({
	collapsed: true,
	toggleSidebar: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

export const SidebarProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [collapsed, setCollapsed] = useState<boolean>(() => {
		const stored = localStorage.getItem('sidebarCollapsed')
		return stored ? JSON.parse(stored) : false
	})

	const toggleSidebar = () => {
		setCollapsed(prev => {
			const newValue = !prev
			localStorage.setItem('sidebarCollapsed', JSON.stringify(newValue))
			return newValue
		})
	}

	useEffect(() => {
		const stored = localStorage.getItem('sidebarCollapsed')
		if (stored !== null) {
			setCollapsed(JSON.parse(stored))
		}
	}, [])

	return (
		<SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	)
}

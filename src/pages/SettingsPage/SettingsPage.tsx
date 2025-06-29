import { CrudListBlock } from '@/components'
import { City } from '@/types/city'
import { Box } from '@mui/material'
import { useState } from 'react'
import CityFormModal from './components/forms/CityFormModal'

const SettingsPage = () => {
	// Заглушка: начальные города
	const [cities, setCities] = useState<City[]>([
		{ _id: '1', name: 'Київ' },
		{ _id: '2', name: 'Дніпро' },
		{ _id: '3', name: 'Черкаси' },
		{ _id: '3', name: 'Черкаси' },
		{ _id: '3', name: 'Черкаси' },
		{ _id: '3', name: 'Черкаси' },
		{ _id: '3', name: 'Черкаси' },
		{ _id: '3', name: 'Черкаси' },
	])

	const [openModal, setOpenModal] = useState(false)
	const [selectedCity, setSelectedCity] = useState<City | null>(null)

	const handleDelete = (id: string) => {
		// Заглушка: удаляем по id
		setCities(prev => prev.filter(city => city._id !== id))
	}

	const handleAdd = () => {
		setSelectedCity(null)
		setOpenModal(true)
	}

	const handleEdit = (city: City) => {
		setSelectedCity(city)
		setOpenModal(true)
	}

	const handleSave = (newCity: City) => {
		if (newCity._id) {
			// Редактирование
			setCities(prev =>
				prev.map(city => (city._id === newCity._id ? newCity : city))
			)
		} else {
			// Добавление
			const newId = (cities.length + 1).toString()
			setCities(prev => [...prev, { ...newCity, _id: newId }])
		}
		setOpenModal(false)
	}

	return (
		<Box sx={{ display: 'flex', gap: 2 }}>
			<CrudListBlock
				title='Города'
				items={cities}
				itemLabel={item => item.name}
				onAdd={handleAdd}
				onEdit={handleEdit}
				onDelete={handleDelete}
				getId={item => item._id}
			/>

			<CityFormModal
				open={openModal}
				initialData={selectedCity}
				onClose={() => setOpenModal(false)}
				onSave={handleSave} // <--- заглушка сохранения
			/>
		</Box>
	)
}

export default SettingsPage

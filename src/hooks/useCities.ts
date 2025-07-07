import {
	createCity,
	deleteCity,
	getCities,
	updateCity,
} from '@/services/cityService'
import { City, CreateCityDto } from '@/types/city'
import { useEffect, useState } from 'react'

export const useCities = () => {
	const [cities, setCities] = useState<City[]>([])
	const [loading, setLoading] = useState(false)

	const fetchCities = async () => {
		setLoading(true)
		try {
			const data = await getCities()
			setCities(data)
		} catch (err) {
			console.error('Ошибка при загрузке городов:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchCities()
	}, [])

	const handleSave = async (city: CreateCityDto | City): Promise<void> => {
		if ('_id' in city && city._id) {
			await updateCity(city._id, city)
		} else {
			await createCity(city)
		}
		await fetchCities()
	}

	const handleDelete = async (id: string) => {
		await deleteCity(id)
		setCities(prev => prev.filter(c => c._id !== id))
	}

	return {
		cities,
		handleSave,
		handleDelete,
		refetch: fetchCities,
	}
}

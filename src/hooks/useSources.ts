import {
	createSource,
	deleteSource,
	getSources,
	updateSource,
} from '@/services/sourceService'
import { CreateSourceDto, Source } from '@/types/source'
import { useEffect, useState } from 'react'

export const useSources = () => {
	const [sources, setSources] = useState<Source[]>([])
	const [loading, setLoading] = useState(false)

	const fetchSources = async () => {
		setLoading(true)
		try {
			const data = await getSources()
			setSources(data)
		} catch (error) {
			console.error('Ошибка при загрузке источников:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchSources()
	}, [])

	const handleSave = async (
		source: Source | CreateSourceDto
	): Promise<Source> => {
		let result: Source

		if ('_id' in source) {
			result = await updateSource(source._id, source)
		} else {
			result = await createSource(source)
		}

		await fetchSources() // <== Гарантированно обновит список

		return result
	}

	const handleDelete = async (id: string): Promise<void> => {
		await deleteSource(id)
		setSources(prev => prev.filter(s => s._id !== id))
	}

	return {
		sources,
		loading,
		handleSave,
		handleDelete,
		refetch: fetchSources,
	}
}

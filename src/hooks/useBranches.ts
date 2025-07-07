import {
	createBranch,
	deleteBranch,
	getBranches,
	updateBranch,
} from '@/services/branchService'
import { Branch, CreateBranchDto } from '@/types/branch'
import { useEffect, useState } from 'react'

export const useBranches = () => {
	const [branches, setBranches] = useState<Branch[]>([])
	const [loading, setLoading] = useState(false)

	const fetchBranches = async () => {
		setLoading(true)
		try {
			const data = await getBranches()
			setBranches(data)
		} catch (error) {
			console.error('Ошибка при загрузке филиалов:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchBranches()
	}, [])

	const handleSave = async (data: Branch | CreateBranchDto) => {
		if ('_id' in data) {
			const updated = await updateBranch(data._id, data)
			setBranches(prev => prev.map(b => (b._id === updated._id ? updated : b)))
		} else {
			const created = await createBranch(data)
			setBranches(prev => [...prev, created])
		}
	}

	const handleDelete = async (id: string) => {
		await deleteBranch(id)
		setBranches(prev => prev.filter(b => b._id !== id))
	}

	return {
		branches,
		loading,
		handleSave,
		handleDelete,
		refetch: fetchBranches,
	}
}

import DataTable from '@/components/DataTable'
import { useStatuses } from '@/hooks/useStatuses'
import { getRecruitersStatusStats } from '@/services/analyticsService'
import { Box, CircularProgress, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'

interface RawRow {
	id: string
	recruiter: string
	statusCounts: Record<string, number>
	total: number
}

interface TableRow {
	id: string
	recruiter: string
	total: number
	[key: string]: any
}

interface StatisticsTableProps {
	filters: {
		search: string
		dateRange: [Date | null, Date | null]
	}
}

const StatisticsTable = ({ filters }: StatisticsTableProps) => {
	const [rawRows, setRawRows] = useState<RawRow[]>([])
	const [loading, setLoading] = useState(true)

	const { statuses, loading: statusesLoading } = useStatuses()

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const recruiterStats = await getRecruitersStatusStats(filters)

				const mappedRows: RawRow[] = recruiterStats.map((row, index) => {
					const total = Object.values(row.statusCounts || {}).reduce(
						(sum, count) => sum + count,
						0
					)

					return {
						id: row.id || index.toString(),
						recruiter: row.recruiter || '—',
						statusCounts: row.statusCounts || {},
						total,
					}
				})

				setRawRows(mappedRows)
			} catch (error) {
				console.error('Ошибка при загрузке статистики:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [filters])

	const filteredRows: TableRow[] = useMemo(() => {
		return rawRows
			.filter(row => {
				return filters.search
					? row.recruiter.toLowerCase().includes(filters.search.toLowerCase())
					: true
			})
			.map(row => {
				const dynamicFields: Record<string, number> = {}

				for (const [statusId, count] of Object.entries(row.statusCounts)) {
					dynamicFields[`status_${statusId}`] = count
				}

				return {
					id: row.id,
					recruiter: row.recruiter,
					total: row.total,
					...dynamicFields,
				}
			})
	}, [rawRows, filters.search])

	const columns: GridColDef[] = useMemo(() => {
		const base: GridColDef[] = [
			{ field: 'recruiter', headerName: 'Пользователь', flex: 1 },
		]

		const dynamic: GridColDef[] = statuses.map(status => ({
			field: `status_${status._id}`,
			headerName: status.name,
			width: 120,
			type: 'number',
		}))

		const total: GridColDef = {
			field: 'total',
			headerName: 'Итого',
			width: 120,
			type: 'number',
		}

		return [...base, ...dynamic, total]
	}, [statuses])

	const totalLoading = loading || statusesLoading

	return (
		<Box mt={3}>
			{totalLoading ? (
				<CircularProgress />
			) : filteredRows.length ? (
				<DataTable
					rows={filteredRows}
					columns={columns}
					pageSize={10}
					total={filteredRows.length}
					getRowId={row => row.id}
				/>
			) : (
				<Typography>Нет данных для отображения</Typography>
			)}
		</Box>
	)
}

export default StatisticsTable

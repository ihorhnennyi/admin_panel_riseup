import { Box } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ru } from 'date-fns/locale'
import { useState } from 'react'

interface DateRangePickerProps {
	labelStart?: string
	labelEnd?: string
	value?: [Date | null, Date | null]
	onChange?: (value: [Date | null, Date | null]) => void
}

const DateRangePicker = ({
	labelStart = 'От',
	labelEnd = 'До',
	value,
	onChange,
}: DateRangePickerProps) => {
	const [internalValue, setInternalValue] = useState<
		[Date | null, Date | null]
	>([null, null])

	const handleChange = (index: 0 | 1, newDate: Date | null) => {
		const newRange: [Date | null, Date | null] = [
			index === 0 ? newDate : value?.[0] ?? internalValue[0],
			index === 1 ? newDate : value?.[1] ?? internalValue[1],
		]

		setInternalValue(newRange)
		onChange?.(newRange)
	}

	const currentValue = value ?? internalValue

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
			<Box display='flex' gap={2}>
				<DatePicker
					value={currentValue[0]}
					onChange={newDate => handleChange(0, newDate)}
					slotProps={{
						textField: {
							label: labelStart,
							size: 'small',
							fullWidth: true,
						},
					}}
				/>
				<DatePicker
					value={currentValue[1]}
					onChange={newDate => handleChange(1, newDate)}
					slotProps={{
						textField: {
							label: labelEnd,
							size: 'small',
							fullWidth: true,
						},
					}}
				/>
			</Box>
		</LocalizationProvider>
	)
}

export default DateRangePicker

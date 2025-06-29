export const leads7Days = [
	{ date: '01.06', leads: 3 },
	{ date: '02.06', leads: 7 },
	{ date: '03.06', leads: 2 },
	{ date: '04.06', leads: 9 },
	{ date: '05.06', leads: 5 },
	{ date: '06.06', leads: 6 },
	{ date: '07.06', leads: 4 },
]

export const leads30Days = Array.from({ length: 30 }, (_, i) => ({
	date: `${i + 1 < 10 ? '0' : ''}${i + 1}.06`,
	leads: Math.floor(Math.random() * 10 + 1),
}))

import Link from 'next/link'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import weeks from '@/lib/weeks'

function WeekHeader({
	children,
	week,
}: {
	children: React.ReactNode
	week: any
}) {
	const now = new Date().getTime()
	let currentWeek = week
	if (!week) {
		currentWeek = weeks.find((week) => {
			return now >= week.startDate.getTime() && now <= week.endDate.getTime()
		})
	}

	return (
		<>
			<div className='flex flex-row justify-between w-full max-w-2xl pb-4 px-2'>
				<Link
					className='text-primary font-bold hover:underline flex items-center gap-2'
					href={`/week/${currentWeek.week === 0 ? 0 : currentWeek.week - 1}`}
				>
					<ChevronsLeft />
				</Link>
				<div className='text-primary text-2xl font-bold flex items-center gap-2'>
					Week {currentWeek?.week}
				</div>
				<Link
					className='text-primary font-bold hover:underline flex items-center gap-2'
					href={`/week/${
						currentWeek.week > weeks.length
							? weeks.length
							: currentWeek.week + 1
					}`}
				>
					<ChevronsRight />
				</Link>
			</div>
			{children}
			<div className='flex flex-row justify-between w-full max-w-2xl pb-4 px-2'>
				<Link
					className='text-primary font-bold hover:underline flex items-center gap-2'
					href={`/week/${currentWeek?.week === 0 ? 0 : currentWeek.week - 1}`}
				>
					<ChevronsLeft />
				</Link>
				<div className='text-primary text-2xl font-bold flex items-center gap-2'>
					Week {currentWeek?.week}
				</div>
				<Link
					className='text-primary font-bold hover:underline flex items-center gap-2'
					href={`/week/${
						currentWeek?.week === weeks.length
							? weeks.length
							: currentWeek.week + 1
					}`}
				>
					<ChevronsRight />
				</Link>
			</div>
		</>
	)
}

export default WeekHeader
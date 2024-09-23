import Link from 'next/link'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import weeks from '@/lib/weeks'

function WeekHeader({
	children,
	week,
	nested,
}: {
	children: React.ReactNode
	week: any
	nested?: string
}) {
	const now = new Date().getTime()
	let currentWeek = week
	if (!week) {
		currentWeek = weeks.find((week) => {
			return now >= week.startDate.getTime() && now <= week.endDate.getTime()
		})
	}

	const link = nested ? `/${nested}/` : `/week/`

	return (
		<>
			<div className='flex flex-row justify-between w-full max-w-2xl pb-4 pt-4 sticky top-0 bg-background/80 z-20'>
				<Link
					className='ml-4 text-primary font-bold flex items-center gap-2 hover:scale-125'
					href={`${link}${currentWeek.week === 0 ? 0 : currentWeek.week - 1}`}
				>
					<ArrowBigLeft className='fill-current' />
				</Link>
				<div className='text-primary text-2xl font-bold flex items-center gap-2'>
					Week {currentWeek?.week}
				</div>
				<Link
					className=' mr-4 text-primary font-bold flex items-center gap-2 hover:scale-125'
					href={`${link}${
						currentWeek.week > weeks.length
							? weeks.length
							: currentWeek.week + 1
					}`}
				>
					<ArrowBigRight className='fill-current' />
				</Link>
			</div>
			{children}
			<div className='flex flex-row justify-between w-full max-w-2xl pb-4 px-2' />
		</>
	)
}

export default WeekHeader

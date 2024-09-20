import { ConferenceCard } from '@/components/conference-card'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Page() {
	const conference = await fetch('http://localhost:3001/conferences', {
		cache: 'no-store',
	})
	const conferenceData = await conference.json()
	// console.log(conferenceData)

	return (
		<main className='flex flex-col items-center min-h-screen mx-4'>
			<div className='w-full max-w-4xl text-center my-10'>
				<h1 className='text-4xl font-bold mb-2'>Conferences</h1>
			</div>
			<div className='flex flex-row flex-wrap w-full gap-4 items-start mb-10 justify-center mx-auto'>
				<Suspense fallback={<Skeleton className='w-full h-full' />}>
					{conferenceData.map((conference) => (
						<ConferenceCard key={conference.id} conference={conference} />
					))}
				</Suspense>
			</div>
		</main>
	)
}

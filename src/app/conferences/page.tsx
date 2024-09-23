import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import ConferenceList from '@/components/ConferenceList'

function ConferencesSkeleton() {
	return <Skeleton className='max-w-md h-full bg-muted' />
}

export default async function Page() {
	// console.log(conferenceData)

	return (
		<main className='flex flex-col items-center min-h-screen mx-4'>
			<div className='w-full max-w-4xl text-center my-10'>
				<h1 className='text-4xl font-bold mb-2'>Conferences</h1>
			</div>
			<Suspense fallback={<ConferencesSkeleton />}>
				<div className='flex flex-row flex-wrap w-full gap-4 items-start mb-10 justify-center mx-auto'>
					<ConferenceList />
				</div>
			</Suspense>
		</main>
	)
}

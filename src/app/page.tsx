import { SimplifiedHero } from '@/components/simplified-hero'
import WeekHeader from '@/components/WeekHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'
import GameFeed from '@/components/GameFeed'

function GameFeedSkeleton() {
	return (
		<div className='max-w-2xl space-y-4'>
			<Skeleton className='h-24 w-full bg-muted' />
			<Skeleton className='h-24 w-full bg-muted' />
			<Skeleton className='h-24 w-full bg-muted' />
		</div>
	)
}

export default async function Home() {
	return (
		<main className='flex flex-col items-center min-h-screen mx-4'>
			<SimplifiedHero />
			<WeekHeader week={null}>
				<Suspense fallback={<GameFeedSkeleton />}>
					<div className='flex flex-col w-full items-center mb-10'>
						<GameFeed />
					</div>
				</Suspense>
			</WeekHeader>
		</main>
	)
}

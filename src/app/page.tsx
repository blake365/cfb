import { SimplifiedHero } from '@/components/simplified-hero'
import { UpcomingGameCard } from '@/components/upcoming-game-card'
import Link from 'next/link'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

export default async function Home() {
	const data = await fetch('http://localhost:3001/games', {
		cache: 'no-store',
	})
	const games = await data.json()

	return (
		<main className='flex flex-col items-center justify-between min-h-screen'>
			<SimplifiedHero />
			<div className='flex flex-row justify-between w-full max-w-2xl pb-4 px-2'>
				<Link
					className='text-primary font-bold hover:underline flex items-center gap-2'
					href='/games/week/1'
				>
					<ChevronsLeft />
					Last Week
				</Link>
				<Link
					className='text-primary font-bold hover:underline flex items-center gap-2'
					href='/games/week/3'
				>
					Next Week
					<ChevronsRight />
				</Link>
			</div>
			<div className='flex flex-col w-full gap-10 items-center'>
				{games.map((game) => (
					<UpcomingGameCard key={game.id} game={game} />
				))}
			</div>
			<div className='flex flex-row justify-between w-full max-w-2xl py-10 px-2'>
				<Link
					className='text-primary font-bold hover:underline flex items-center gap-2'
					href='/games/week/1'
				>
					<ChevronsLeft />
					Last Week
				</Link>
				<Link
					className='text-primary font-bold hover:underline flex items-center gap-2'
					href='/games/week/3'
				>
					Next Week
					<ChevronsRight />
				</Link>
			</div>
		</main>
	)
}

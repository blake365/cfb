import { SimplifiedHero } from '@/components/simplified-hero'
import { UpcomingGameCard } from '@/components/upcoming-game-card'
import WeekHeader from '@/components/WeekHeader'

export default async function Home() {
	const data = await fetch('http://localhost:3001/games', {
		cache: 'no-store',
	})
	const games = await data.json()

	// console.log(games[12])

	// console.log(currentWeek.week)

	return (
		<main className='flex flex-col items-center justify-between min-h-screen'>
			<SimplifiedHero />
			<WeekHeader>
				<div className='flex flex-col w-full gap-10 items-center mb-10'>
					{games.map((game) => (
						<UpcomingGameCard key={game.id} game={game} />
					))}
				</div>
			</WeekHeader>
		</main>
	)
}

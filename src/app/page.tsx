import { SimplifiedHero } from '@/components/simplified-hero'
import { UpcomingGameCard } from '@/components/upcoming-game-card'
import WeekHeader from '@/components/WeekHeader'
import weeks from '@/lib/weeks'

export default async function Home() {
	const now = new Date().getTime()
	const currentWeek = weeks.find((week) => {
		return now >= week.startDate.getTime() && now <= week.endDate.getTime()
	})

	const data = await fetch(
		`http://localhost:3001/games/week/${currentWeek.week}`,
		{
			cache: 'no-store',
		}
	)
	const games = await data.json()

	return (
		<main className='flex flex-col items-center min-h-screen mx-4'>
			<SimplifiedHero />
			<WeekHeader week={null}>
				<div className='flex flex-col w-full gap-10 items-center mb-10'>
					{games.map((game) => (
						<UpcomingGameCard key={game.id} game={game} />
					))}
				</div>
			</WeekHeader>
		</main>
	)
}

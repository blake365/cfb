import WeekHeader from '@/components/WeekHeader'
import { UpcomingGameCard } from '@/components/upcoming-game-card'
import weeks from '@/lib/weeks'

export default async function Page({ params }: { params: { slug: string } }) {
	// console.log(params.slug)
	const now = new Date().getTime()
	const currentWeek = weeks.find((week) => {
		return now >= week.startDate.getTime() && now <= week.endDate.getTime()
	})

	const games = await fetch(
		`http://localhost:3001/games/conference/${params.slug}/${currentWeek.week}`,
		{
			cache: 'no-store',
		}
	)
	const gamesData = await games.json()
	// console.log(gamesData)

	return (
		<main className='flex flex-col items-center min-h-screen mx-4'>
			<WeekHeader week={null} nested={`conferences/${params.slug}`}>
				<div className='flex flex-col w-full gap-10 items-center mb-10'>
					{gamesData.map((game) => (
						<UpcomingGameCard key={game.id} game={game} />
					))}
				</div>
			</WeekHeader>
		</main>
	)
}

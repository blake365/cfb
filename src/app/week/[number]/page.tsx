import { UpcomingGameCard } from '@/components/upcoming-game-card'
import WeekHeader from '@/components/WeekHeader'

export default async function Page({ params }: { params: { number: string } }) {
	// console.log(params.number)
	const data = await fetch(
		`http://localhost:3001/games/week/${params.number}`,
		{
			cache: 'no-store',
		}
	)
	const games = await data.json()

	// console.log(teamData)

	return (
		<main className='flex flex-col items-center min-h-screen'>
			<div className='w-full max-w-4xl text-center my-10'>
				<h1 className='text-4xl font-bold mb-2'>Week {params.number} Games</h1>
			</div>
			<WeekHeader week={{ week: Number(params.number) }}>
				<div className='flex flex-col w-full gap-10 items-center mb-10'>
					{games.map((game) => (
						<UpcomingGameCard key={game.id} game={game} />
					))}
				</div>
			</WeekHeader>
		</main>
	)
}

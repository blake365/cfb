import { UpcomingGameCard } from '@/components/upcoming-game-card'
import WeekHeader from '@/components/WeekHeader'
import { TinyTeamCard } from '@/components/tiny-team-card'

export default async function Page({
	params,
}: {
	params: { slug: string; week: string }
}) {
	// console.log(params.slug)
	// console.log(params.week)
	const conference = await fetch(
		`http://localhost:3001/conferences/${params.slug}`,
		{
			cache: 'no-store',
		}
	)
	const conferenceData = await conference.json()

	const games = await fetch(
		`http://localhost:3001/games/conference/${params.slug}/${params.week}`,
		{
			cache: 'no-store',
		}
	)
	const gamesData = await games.json()
	// console.log(gamesData)

	// console.log(teamData)
	return (
		<main className='flex flex-col items-center min-h-screen mx-4'>
			<div className='w-full max-w-4xl text-center my-10'>
				<h1 className='text-4xl font-bold mb-2'>{conferenceData.fullName}</h1>
			</div>
			<div className='flex flex-row flex-wrap w-full gap-4 items-center mb-10 justify-center'>
				{conferenceData.teams.map((team) => (
					<TinyTeamCard key={team.id} team={team} />
				))}
			</div>
			<WeekHeader
				week={{ week: Number.parseInt(params.week) }}
				nested={`conferences/${params.slug}`}
			>
				<div className='flex flex-col w-full gap-10 items-center mb-10'>
					{gamesData.map((game) => (
						<UpcomingGameCard key={game.id} game={game} />
					))}
				</div>
			</WeekHeader>
		</main>
	)
}

import { UpcomingGameCard } from '@/components/upcoming-game-card'
import TeamStats from '@/components/TeamStats'

export default async function Page({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	// console.log(params.slug)
	const data = await fetch(`http://localhost:3001/games/team/${params.slug}`, {
		cache: 'no-store',
	})
	const games = await data.json()

	const team = await fetch(`http://localhost:3001/teams/name/${params.slug}`, {
		cache: 'no-store',
	})
	const teamData = await team.json()

	return (
		<main className='flex flex-col items-center min-h-screen mx-4'>
			<TeamStats teamData={teamData} />
			<div className='flex flex-col w-full gap-10 items-center mb-20'>
				{games.map((game) => (
					<UpcomingGameCard key={game.id} game={game} />
				))}
			</div>
		</main>
	)
}

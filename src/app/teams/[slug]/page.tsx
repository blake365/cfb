import { UpcomingGameCard } from '@/components/upcoming-game-card'
import Link from 'next/link'

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

	const team = await fetch(`http://localhost:3001/teams/name/${params.slug}`)
	const teamData = await team.json()

	// console.log(teamData)

	return (
		<main className='flex flex-col items-center min-h-screen'>
			<div className='w-full max-w-4xl text-center my-10'>
				<h1 className='text-4xl font-bold mb-2'>{teamData.name}</h1>
				<h2 className='text-2xl mb-2'>{teamData.mascot}</h2>
				<Link
					href={`/conferences/${teamData.conference.name}`}
					className='text-xl text-muted-foreground hover:underline'
				>
					{teamData.conference.name}
				</Link>
				<p className='text-lg mt-2'>
					Record: {teamData.wins}-{teamData.losses}
					{teamData.ties > 0 && `-${teamData.ties}`}
				</p>
			</div>
			<div className='flex flex-col w-full gap-10 items-center mb-20'>
				{games.map((game) => (
					<UpcomingGameCard key={game.id} game={game} />
				))}
			</div>
		</main>
	)
}

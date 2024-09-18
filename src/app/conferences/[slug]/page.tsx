import { CollegeFootballTeamCard } from '@/components/college-football-team-card'

export default async function Page({ params }: { params: { slug: string } }) {
	console.log(params.slug)

	const conference = await fetch(
		`http://localhost:3001/conferences/${params.slug}`,
		{
			cache: 'no-store',
		}
	)
	const conferenceData = await conference.json()
	// console.log(conferenceData)

	return (
		<main className='flex flex-col items-center min-h-screen mx-4'>
			<div className='w-full max-w-4xl text-center my-10'>
				<h1 className='text-4xl font-bold mb-2'>{conferenceData.name}</h1>
			</div>
			<div className='flex flex-row flex-wrap w-full gap-4 items-center mb-10 justify-center'>
				{conferenceData.teams.map((team) => (
					<CollegeFootballTeamCard
						key={team.id}
						conference={conferenceData.abbreviation}
						team={team}
					/>
				))}
			</div>
		</main>
	)
}

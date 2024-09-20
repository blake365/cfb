import { CollegeFootballTeamCard } from '@/components/college-football-team-card'

export default async function Page() {
	const teams = await fetch('http://localhost:3001/teams')
	const teamsData = await teams.json()
	// console.log(teamsData)

	return (
		<main className='flex flex-col items-center min-h-screen mx-4'>
			<div className='w-full max-w-4xl text-center my-10'>
				<h1 className='text-4xl font-bold mb-2'>All Teams</h1>
			</div>
			<div className='flex flex-row flex-wrap w-full gap-4 items-start mb-10 justify-center mx-auto'>
				{teamsData.map((team) => (
					<CollegeFootballTeamCard key={team.id} team={team} />
				))}
			</div>
		</main>
	)
}

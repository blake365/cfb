import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'

export function CollegeFootballTeamCard({ conference, team }) {
	return (
		<Link href={`/teams/${team.name}`} className='w-full max-w-md mx-auto'>
			<Card className='w-full border-slate-800 hover:shadow-lg px-4 pb-2 pt-4 bg-muted hover:border-primary'>
				<CardHeader className='flex flex-row items-center space-x-4 pb-2'>
					<Avatar
						className='h-14 w-14 font-bold'
						style={{
							backgroundColor: team.primaryColor,
							color: team.secondaryColor,
						}}
					>
						<AvatarImage src={team.icon} alt={`${team.name} logo`} />
						<AvatarFallback>{team.abbreviation}</AvatarFallback>
					</Avatar>
					<div className='flex-1'>
						<CardTitle className='text-2xl font-bold'>{team.name}</CardTitle>
						<p className='text-sm text-muted-foreground'>{team.mascot}</p>
					</div>
				</CardHeader>
			</Card>
		</Link>
	)
}

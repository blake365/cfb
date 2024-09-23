import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { TinyTeamCard } from './tiny-team-card'

export function ConferenceCard({ conference }) {
	return (
		<Card className='max-w-md w-full border-slate-800 hover:shadow-lg hover:border-primary px-4 pb-2 pt-4 bg-muted'>
			<CardHeader>
				<Link
					href={`/conferences/${conference.name}`}
					className='flex flex-row items-center space-x-4 pb-2'
				>
					<Avatar className='h-14 w-14 font-bold bg-primary'>
						<AvatarImage
							src={conference.icon}
							alt={`${conference.name} logo`}
						/>
						<AvatarFallback>{conference.abbreviation}</AvatarFallback>
					</Avatar>
					<div className='flex-1'>
						<CardTitle className='text-2xl font-bold'>
							{conference.name}
						</CardTitle>
						<p className='text-sm text-muted-foreground'>
							{conference.fullName}
						</p>
						<p className='text-sm text-muted-foreground'>
							{conference.classification.toUpperCase()}
						</p>
					</div>
				</Link>
			</CardHeader>
			<CardContent>
				<div className='flex flex-row flex-wrap w-full gap-2 items-center'>
					{conference.teams.map((team) => (
						<TinyTeamCard key={team.id} team={team} size={8} />
					))}
				</div>
			</CardContent>
		</Card>
	)
}

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'

export function TinyTeamCard({ team }) {
	return (
		<Link href={`/teams/${team.name}`}>
			<Avatar
				className='h-14 w-14 font-bold border border-muted-foreground hover:border-primary'
				style={{
					backgroundColor: team.primaryColor,
					color: team.secondaryColor,
				}}
			>
				<AvatarImage src={team.icon} alt={`${team.name} logo`} />
				<AvatarFallback>{team.abbreviation}</AvatarFallback>
			</Avatar>
		</Link>
	)
}

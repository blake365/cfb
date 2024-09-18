import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'

export function ConferenceCard({ conference }) {
	return (
		<Link
			href={`/conferences/${conference.name}`}
			className='w-full max-w-md mx-auto'
		>
			<Card className='w-full border-slate-800 hover:shadow-lg hover:border-primary px-4 pb-2 pt-4 bg-muted'>
				<CardHeader className='flex flex-row items-center space-x-4 pb-2'>
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
				</CardHeader>
			</Card>
		</Link>
	)
}

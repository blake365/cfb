import Image from 'next/image'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

// Updated mock data for games
const games = [
	{
		id: 1,
		homeTeam: {
			name: 'Ohio State',
			logo: '/placeholder.svg?height=40&width=40',
			score: 28,
		},
		awayTeam: {
			name: 'Michigan',
			logo: '/placeholder.svg?height=40&width=40',
			score: 27,
		},
		date: '2023-11-25',
		time: '12:00 PM',
		location: 'Ohio Stadium, Columbus, OH',
		status: 'completed',
	},
	{
		id: 2,
		homeTeam: {
			name: 'Alabama',
			logo: '/placeholder.svg?height=40&width=40',
			score: 21,
		},
		awayTeam: {
			name: 'Auburn',
			logo: '/placeholder.svg?height=40&width=40',
			score: 14,
		},
		date: '2023-11-25',
		time: '3:30 PM',
		location: 'Bryant-Denny Stadium, Tuscaloosa, AL',
		status: 'in_progress',
	},
	{
		id: 3,
		homeTeam: { name: 'USC', logo: '/placeholder.svg?height=40&width=40' },
		awayTeam: { name: 'UCLA', logo: '/placeholder.svg?height=40&width=40' },
		date: '2023-11-18',
		time: '7:30 PM',
		location: 'Los Angeles Memorial Coliseum, Los Angeles, CA',
		status: 'upcoming',
	},
]

function Component() {
	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'completed':
				return <Badge variant='secondary'>Final</Badge>
			case 'in_progress':
				return <Badge variant='destructive'>Live</Badge>
			case 'upcoming':
				return <Badge variant='outline'>Upcoming</Badge>
			default:
				return null
		}
	}

	const getScoreDisplay = (game) => {
		if (game.status === 'upcoming') {
			return <span className='text-sm font-medium'>VS</span>
		}
		return (
			<div className='flex items-center space-x-2'>
				<span className='font-bold'>{game.homeTeam.score}</span>
				<span className='text-sm font-medium'>-</span>
				<span className='font-bold'>{game.awayTeam.score}</span>
			</div>
		)
	}

	return (
		<Card className='w-full max-w-3xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold text-center'>
					College Football Games
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='space-y-4'>
					{games.map((game) => (
						<li key={game.id}>
							<Card>
								<CardContent className='p-4'>
									<div className='flex flex-wrap items-center justify-between gap-4'>
										<div className='flex items-center space-x-4'>
											<Avatar className='w-10 h-10'>
												<AvatarImage
													src={game.homeTeam.logo}
													alt={`${game.homeTeam.name} logo`}
												/>
												<AvatarFallback>
													{game.homeTeam.name.substring(0, 2)}
												</AvatarFallback>
											</Avatar>
											<span className='font-semibold'>
												{game.homeTeam.name}
											</span>
										</div>
										<div className='flex flex-col items-center'>
											{getStatusBadge(game.status)}
											{getScoreDisplay(game)}
										</div>
										<div className='flex items-center space-x-4'>
											<span className='font-semibold'>
												{game.awayTeam.name}
											</span>
											<Avatar className='w-10 h-10'>
												<AvatarImage
													src={game.awayTeam.logo}
													alt={`${game.awayTeam.name} logo`}
												/>
												<AvatarFallback>
													{game.awayTeam.name.substring(0, 2)}
												</AvatarFallback>
											</Avatar>
										</div>
									</div>
									<div className='mt-4 text-sm text-muted-foreground'>
										<p>
											{new Date(game.date).toLocaleDateString('en-US', {
												weekday: 'long',
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}{' '}
											at {game.time}
										</p>
										<p>{game.location}</p>
									</div>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}

export default function Home() {
	return (
		<main className='flex flex-col items-center justify-between min-h-screen p-24'>
			<Component />
		</main>
	)
}

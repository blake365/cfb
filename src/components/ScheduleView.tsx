import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Mock data for upcoming games
const upcomingGames = [
	{
		id: 1,
		homeTeam: {
			name: 'Ohio State',
			logo: '/placeholder.svg?height=40&width=40',
		},
		awayTeam: { name: 'Michigan', logo: '/placeholder.svg?height=40&width=40' },
		date: '2023-11-25',
		time: '12:00 PM',
		location: 'Ohio Stadium, Columbus, OH',
	},
	{
		id: 2,
		homeTeam: { name: 'Alabama', logo: '/placeholder.svg?height=40&width=40' },
		awayTeam: { name: 'Auburn', logo: '/placeholder.svg?height=40&width=40' },
		date: '2023-11-25',
		time: '3:30 PM',
		location: 'Bryant-Denny Stadium, Tuscaloosa, AL',
	},
	{
		id: 3,
		homeTeam: { name: 'USC', logo: '/placeholder.svg?height=40&width=40' },
		awayTeam: { name: 'UCLA', logo: '/placeholder.svg?height=40&width=40' },
		date: '2023-11-18',
		time: '7:30 PM',
		location: 'Los Angeles Memorial Coliseum, Los Angeles, CA',
	},
]

export default function ScheduleView() {
	return (
		<Card className='w-full max-w-3xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold text-center'>
					Upcoming College Football Games
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='space-y-4'>
					{upcomingGames.map((game) => (
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
										<div className='text-sm font-medium'>VS</div>
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

'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarDays, Clock, MapPin, Tv } from 'lucide-react'
import { CompactReactionSelector } from './compact-reaction-selector'
import Link from 'next/link'
import EmojiRain from './EmojiRain'

export function UpcomingGameCard({ game }) {
	const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)

	if (!game) {
		return <div>No game data available</div>
	}

	// console.log(game)

	const handleReactionSelect = (emoji: string) => {
		setSelectedEmoji(emoji)
		// Reset the emoji after the animation duration
		setTimeout(() => setSelectedEmoji(null), 2000)
	}

	return (
		<div className='relative w-full max-w-2xl px-2'>
			<Card className='w-full border-slate-800 hover:shadow-lg px-4 pb-2 pt-4 bg-muted'>
				<CardContent className=''>
					<div className='flex justify-center items-center'>
						<div className='flex flex-row flex-1 justify-center space-x-4'>
							<div className='flex flex-col items-center'>
								<Avatar
									className='h-14 w-14 font-bold'
									style={{
										backgroundColor: game.team_awayTeamId.primaryColor,
										color: game.team_awayTeamId.secondaryColor,
									}}
								>
									<AvatarImage
										src={game.team_awayTeamId.icon}
										alt={`${game.team_awayTeamId.name} logo`}
									/>
									<AvatarFallback>
										{game.team_awayTeamId.abbreviation}
									</AvatarFallback>
								</Avatar>
								<Link
									href={`/teams/${game.team_awayTeamId.name}`}
									className='font-semibold hover:underline text-center'
								>
									{game.team_awayTeamId.name}
									{game.team_awayTeamId.apRank
										? ` (#${game.team_awayTeamId.apRank})`
										: ''}
								</Link>

								<span className='text-sm text-muted-foreground'>
									{game.team_awayTeamId.wins} - {game.team_awayTeamId.losses}
								</span>
							</div>
						</div>
						<div className='text-center flex flex-row items-center justify-center space-x-2'>
							{game.awayTeamScore !== null && (
								<div className='flex items-center justify-center border border-primary p-3'>
									<span className='text-3xl'>{game.awayTeamScore}</span>
								</div>
							)}
							<span className='text-lg'>at</span>
							{game.homeTeamScore !== null && (
								<div className='flex items-center justify-center border border-primary p-3'>
									<span className='text-3xl'>{game.homeTeamScore}</span>
								</div>
							)}
						</div>
						<div className='flex flex-row flex-1 justify-center space-x-4'>
							<div className='flex flex-col items-center'>
								<Avatar
									className='h-14 w-14 font-bold'
									style={{
										backgroundColor: game.team_homeTeamId.primaryColor,
										color: game.team_homeTeamId.secondaryColor,
									}}
								>
									<AvatarImage
										src={game.team_homeTeamId.icon}
										alt={`${game.team_homeTeamId.name} logo`}
									/>
									<AvatarFallback>
										{game.team_homeTeamId.abbreviation}
									</AvatarFallback>
								</Avatar>
								<Link
									href={`/teams/${game.team_homeTeamId.name}`}
									className='font-semibold hover:underline text-center'
								>
									{game.team_homeTeamId.name}
									{game.team_homeTeamId.apRank
										? ` (#${game.team_homeTeamId.apRank})`
										: ''}
								</Link>

								<span className='text-sm text-muted-foreground'>
									{game.team_homeTeamId.wins} - {game.team_homeTeamId.losses}
								</span>
							</div>
						</div>
					</div>
					<div className='pt-2 space-y-1'>
						<div className='flex flex-row gap-x-4 flex-wrap mb-6'>
							<div className='flex items-center text-sm'>
								<CalendarDays className='h-4 w-4 mr-2 text-muted-foreground' />
								<span>
									{new Date(game.gameStart).toLocaleDateString('en-US', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</span>
							</div>
							<div className='flex items-center text-sm'>
								<Clock className='h-4 w-4 mr-2 text-muted-foreground' />
								<span>
									{new Date(game.gameStart).toLocaleTimeString('en-US', {
										hour: '2-digit',
										minute: '2-digit',
									})}
								</span>
							</div>
							<div className='flex items-center text-sm'>
								<MapPin className='h-4 w-4 mr-2 text-muted-foreground' />
								<span>{game.location}</span>
							</div>
							<div className='flex items-center text-sm'>
								<Tv className='h-4 w-4 mr-2 text-muted-foreground' />
								<span>{game.tvNetwork?.toUpperCase()}</span>
								<div> score: {game.interestScore}</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<div className='absolute -bottom-6 w-fit right-8'>
				<CompactReactionSelector
					onReactionSelect={handleReactionSelect}
					gameId={game.id}
					interactions={game.interactions}
				/>
			</div>
			{selectedEmoji && <EmojiRain emoji={selectedEmoji} />}
		</div>
	)
}

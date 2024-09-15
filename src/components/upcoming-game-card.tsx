'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarDays, Clock, MapPin, Tv } from 'lucide-react'
import { CompactReactionSelector } from './compact-reaction-selector'
import Link from 'next/link'
import EmojiRain from './EmojiRain'

function getContrastColor(hexColor: string): string {
	// console.log(hexColor)
	if (!hexColor) {
		return '#000000'
	}
	// Remove the hash if it's there
	const color = hexColor.charAt(0) === '#' ? hexColor.substring(1, 7) : hexColor

	// Convert hex to RGB
	const r = parseInt(color.substring(0, 2), 16)
	const g = parseInt(color.substring(2, 4), 16)
	const b = parseInt(color.substring(4, 6), 16)

	// Calculate luminance
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

	// Return black for light colors, white for dark colors
	return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

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
			<Card className='w-full border-slate-800 hover:shadow-lg px-4 py-2'>
				<CardContent className=''>
					<div className='flex justify-center items-center'>
						<div className='flex flex-col items-center flex-1'>
							<Avatar
								className='h-12 w-12 font-bold'
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
								href={`/teams/${game.team_homeTeamId.abbreviation}`}
								className='font-semibold hover:underline'
							>
								{game.team_homeTeamId.name}
							</Link>
							<span className='text-sm text-muted-foreground'>
								{game.team_homeTeamId.wins} - {game.team_homeTeamId.losses}
							</span>
						</div>
						<div className='text-center'>
							<span className='text-lg'>at</span>
						</div>
						<div className='flex flex-col items-center flex-1'>
							<Avatar
								className='h-12 w-12 font-bold'
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
								href={`/teams/${game.team_awayTeamId.abbreviation}`}
								className='font-semibold hover:underline'
							>
								{game.team_awayTeamId.name}
							</Link>
							<span className='text-sm text-muted-foreground'>
								{game.team_awayTeamId.wins} - {game.team_awayTeamId.losses}
							</span>
						</div>
					</div>
					<div className='pt-2 space-y-1'>
						<div className='flex flex-row space-x-4'>
							<div className='flex items-center text-sm'>
								<CalendarDays className='h-4 w-4 mr-2 text-muted-foreground' />
								<span>
									{new Date(game.gameDate).toLocaleDateString('en-US', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</span>
							</div>
							<div className='flex items-center text-sm'>
								<Clock className='h-4 w-4 mr-2 text-muted-foreground' />
								<span>{game.gameTime?.toLocaleString()}</span>
							</div>
						</div>
						<div className='flex flex-row space-x-4'>
							<div className='flex items-center text-sm'>
								<MapPin className='h-4 w-4 mr-2 text-muted-foreground' />
								<span>{game.stadiumId}</span>
							</div>
						</div>
						<div className='flex items-center text-sm'>
							<Tv className='h-4 w-4 mr-2 text-muted-foreground' />
							<span>{game.tvNetwork?.toUpperCase()}</span>
						</div>
					</div>
				</CardContent>
			</Card>
			<div className='absolute -bottom-6 w-fit right-8  bg-white'>
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

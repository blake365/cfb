'use client'

import React, { useState } from 'react'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarDays, Clock, MapPin, Tv } from 'lucide-react'
import { CompactReactionSelector } from './compact-reaction-selector'

// Mock data for the upcoming game
const gameData = {
	id: 15,
	homeTeamId: 26,
	awayTeamId: 10,
	gameDate: '2024-08-31',
	homeTeamScore: null,
	awayTeamScore: null,
	stadiumId: null,
	seasonId: 1,
	gameTime: '15:30:00 EST',
	type: 'regular',
	tvNetwork: 'abc',
	winnerId: null,
	team_homeTeamId: {
		id: 26,
		name: 'Florida',
		abbreviation: null,
		mascot: 'Gators',
		wins: 0,
		losses: 0,
		ties: 0,
		headCoach: null,
		establishedYear: null,
		seasonId: null,
		conferenceId: 2,
		stadiumId: null,
		icon: null,
		apRank: null,
		coachesRank: null,
		cfpRank: null,
		primaryColor: '#0021A5',
		secondaryColor: '#FA4616',
		gamesPlayed: null,
	},
	team_awayTeamId: {
		id: 10,
		name: 'Miami',
		abbreviation: null,
		mascot: 'Hurricanes',
		wins: 0,
		losses: 0,
		ties: 0,
		headCoach: null,
		establishedYear: null,
		seasonId: 1,
		conferenceId: 1,
		stadiumId: null,
		icon: null,
		apRank: null,
		coachesRank: null,
		cfpRank: null,
		primaryColor: null,
		secondaryColor: null,
		gamesPlayed: null,
	},
}

export function UpcomingGameCard() {
	const homePrimary = `bg-[${gameData.team_homeTeamId.primaryColor}]`

	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardContent className='space-y-2 pt-4'>
				<div className='flex justify-between items-center'>
					<div className='flex flex-col items-center'>
						<Avatar className='h-16 w-16 mb-2 bg-muted'>
							<AvatarImage
								src={gameData.team_homeTeamId.icon}
								alt={`${gameData.team_homeTeamId.name} logo`}
							/>
							<AvatarFallback>
								{gameData.team_homeTeamId.name.substring(0, 2)}
							</AvatarFallback>
						</Avatar>
						<span className='font-semibold'>
							{gameData.team_homeTeamId.name}
						</span>
						<span className='text-sm text-muted-foreground'>
							{gameData.team_homeTeamId.wins} -{' '}
							{gameData.team_homeTeamId.losses}
						</span>
					</div>
					<div className='text-center'>
						<span className='text-2xl font-bold'>VS</span>
					</div>
					<div className='flex flex-col items-center'>
						<Avatar className='h-16 w-16 mb-2 bg-muted'>
							<AvatarImage
								src={gameData.team_awayTeamId.icon}
								alt={`${gameData.team_awayTeamId.name} logo`}
							/>
							<AvatarFallback>
								{gameData.team_awayTeamId.name.substring(0, 2)}
							</AvatarFallback>
						</Avatar>
						<span className='font-semibold'>
							{gameData.team_awayTeamId.name}
						</span>
						<span className='text-sm text-muted-foreground'>
							{gameData.team_awayTeamId.wins} -{' '}
							{gameData.team_awayTeamId.losses}
						</span>
					</div>
				</div>
				<div className='space-y-2'>
					<div className='flex items-center text-sm'>
						<CalendarDays className='h-4 w-4 mr-2 text-muted-foreground' />
						<span>
							{new Date(gameData.gameDate).toLocaleDateString('en-US', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</span>
					</div>
					<div className='flex items-center text-sm'>
						<Clock className='h-4 w-4 mr-2 text-muted-foreground' />
						<span>{gameData.gameTime.toLocaleString()}</span>
					</div>
					<div className='flex items-center text-sm'>
						<MapPin className='h-4 w-4 mr-2 text-muted-foreground' />
						<span>{gameData.stadiumId}</span>
					</div>
					<div className='flex items-center text-sm'>
						<Tv className='h-4 w-4 mr-2 text-muted-foreground' />
						<span>{gameData.tvNetwork.toUpperCase()}</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className='flex items-center justify-center bg-muted'>
				<CompactReactionSelector />
			</CardFooter>
		</Card>
	)
}

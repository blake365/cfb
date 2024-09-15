'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { Switch } from '@/components/ui/switch'
import { useQuery, useMutation } from '@tanstack/react-query'
import weeks from '@/lib/weeks'

// Mock data for game types
const gameTypes = ['regular', 'conference championship', 'bowl', 'playoff']

// Mock data for TV networks
const tvNetworks = [
	{ id: 'espn', name: 'ESPN' },
	{ id: 'abc', name: 'ABC' },
	{ id: 'fox', name: 'FOX' },
	{ id: 'cbs', name: 'CBS' },
	{ id: 'nbc', name: 'NBC' },
	{ id: 'fs1', name: 'FS1' },
	{ id: 'espn2', name: 'ESPN2' },
	{ id: 'secn', name: 'SEC Network' },
	{ id: 'accn', name: 'ACC Network' },
	{ id: 'btn', name: 'Big Ten Network' },
	{ id: 'pac12n', name: 'Pac-12 Network' },
	{ id: 'nbcsn', name: 'NBC Sports Network' },
]

// Mock data for seasons
const seasons = [
	{ id: 0, year: 'none' },
	{ id: '1', year: '2024' },
]

const formSchema = z
	.object({
		homeTeamId: z.string().min(1, 'Home team is required'),
		awayTeamId: z.string().min(1, 'Away team is required'),
		gameDate: z.string().min(1, 'Date is required'),
		rivalry: z.boolean(),
		// gameTime: z.string().min(1, 'Time is required'),
		type: z.string().min(1, 'Game type is required'),
		tvNetwork: z.string().min(1, 'TV network is required'),
		seasonId: z.string().min(1, 'Season is required'),
		week: z.number().min(0, 'Week is required'),
	})
	.refine((data) => data.homeTeamId !== data.awayTeamId, {
		message: 'Home and away teams must be different',
		path: ['awayTeamId'],
	})

export default function AddGame() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			homeTeamId: '',
			awayTeamId: '',
			rivalry: false,
			gameDate: '',
			// gameTime: '',
			type: '',
			tvNetwork: '',
			seasonId: '',
			week: 0,
		},
	})

	const query = useQuery({
		queryKey: ['teams'],
		queryFn: async () => {
			const response = await fetch('http://localhost:3001/teams')
			return response.json()
		},
		placeholderData: [],
	})

	const teams = query.data

	const mutation = useMutation({
		mutationFn: async (game: z.infer<typeof formSchema>) => {
			const response = await fetch('http://localhost:3001/games/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(game),
			})

			if (!response.ok) {
				throw new Error('Failed to add game')
			}
		},
		onSuccess: (data, variables, context) => {
			console.log(data, variables, context)
			toast({
				title: 'Game submitted successfully',
				description: `Game between ${variables.homeTeamId}  and ${variables.awayTeamId} has been added to the database.`,
			})
			form.reset()
		},
		onError: (error, variables, context) => {
			// An error happened!
			console.log(`rolling back optimistic update with id ${context.id}`)
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		const now = new Date(values.gameDate).getTime()
		const gameWeek = weeks.find((week) => {
			return now >= week.startDate.getTime() && now <= week.endDate.getTime()
		})
		values.week = gameWeek?.week || 0
		mutation.mutate(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full max-w-md mx-auto space-y-2'
			>
				<FormField
					control={form.control}
					name='awayTeamId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Away Team</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select away team' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{teams.map((team) => (
										<SelectItem key={team.id} value={team.id.toString()}>
											{team.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								The team traveling to play the game.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='homeTeamId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Home Team</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select home team' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{teams.map((team) => (
										<SelectItem key={team.id} value={team.id.toString()}>
											{team.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								The team playing at their home stadium.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='rivalry'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='block'>Rivalry Game</FormLabel>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='gameDate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date</FormLabel>
							<FormControl>
								<Input type='datetime-local' {...field} />
							</FormControl>
							<FormDescription>The date of the game.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* <FormField
					control={form.control}
					name='gameTime'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time</FormLabel>
							<FormControl>
								<Input type='time' {...field} />
							</FormControl>
							<FormDescription>The kickoff time of the game.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/> */}
				<FormField
					control={form.control}
					name='type'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Game Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select game type' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{gameTypes.map((type) => (
										<SelectItem key={type} value={type}>
											{type}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								The type or classification of the game.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='tvNetwork'
					render={({ field }) => (
						<FormItem>
							<FormLabel>TV Network</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select TV network' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{tvNetworks.map((network) => (
										<SelectItem key={network.id} value={network.id}>
											{network.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								The network broadcasting the game.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='seasonId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Season</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select season' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{seasons.map((season) => (
										<SelectItem key={season.id} value={season.id}>
											{season.year}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								The season in which the game takes place.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full' disabled={isSubmitting}>
					{isSubmitting ? 'Creating Matchup...' : 'Create Matchup'}
				</Button>
			</form>
		</Form>
	)
}

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
import { useQuery } from '@tanstack/react-query'

// Mock data for teams
// const teams = [
// 	{ id: '1', name: 'Ohio State' },
// 	{ id: '2', name: 'Michigan' },
// 	{ id: '3', name: 'Alabama' },
// 	{ id: '4', name: 'Georgia' },
// 	{ id: '5', name: 'Clemson' },
// ]

// Mock data for game types
const gameTypes = ['regular', 'conference championship', 'bowl', 'playoff']

// Mock data for TV networks
const tvNetworks = [
	{ id: 'espn', name: 'ESPN' },
	{ id: 'abc', name: 'ABC' },
	{ id: 'fox', name: 'FOX' },
	{ id: 'cbs', name: 'CBS' },
	{ id: 'nbc', name: 'NBC' },
]

// Mock data for seasons
const seasons = [{ id: '1', year: '2024' }]

const formSchema = z
	.object({
		homeTeamId: z.string().min(1, 'Home team is required'),
		awayTeamId: z.string().min(1, 'Away team is required'),
		date: z.string().min(1, 'Date is required'),
		time: z.string().min(1, 'Time is required'),
		type: z.string().min(1, 'Game type is required'),
		tvNetwork: z.string().min(1, 'TV network is required'),
		seasonId: z.string().min(1, 'Season is required'),
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
			date: '',
			time: '',
			type: '',
			tvNetwork: '',
			seasonId: '',
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

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true)
		// Simulate API call
		setTimeout(() => {
			console.log(values)
			toast({
				title: 'Matchup created successfully',
				description: `${
					teams.find((t) => t.id === values.homeTeamId)?.name
				} vs ${
					teams.find((t) => t.id === values.awayTeamId)?.name
				} has been scheduled.`,
			})
			setIsSubmitting(false)
			form.reset()
		}, 1000)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full max-w-md mx-auto space-y-8'
			>
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
					name='date'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date</FormLabel>
							<FormControl>
								<Input type='date' {...field} />
							</FormControl>
							<FormDescription>The date of the game.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='time'
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
				/>
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
										<SelectItem key={type.id} value={type.id}>
											{type.name}
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
											{season.name}
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

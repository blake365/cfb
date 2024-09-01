'use client'
import { useState } from 'react'
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
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

const formSchema = z.object({
	name: z.string().min(1, 'Team name is required'),
	abbreviation: z.string().min(1, 'Abbreviation is required'),
	mascot: z.string().min(1, 'Mascot is required'),
	wins: z.number().int().min(0, 'Wins must be a non-negative integer'),
	losses: z.number().int().min(0, 'Losses must be a non-negative integer'),
	ties: z.number().int().min(0, 'Ties must be a non-negative integer'),
	gamesPlayed: z
		.number()
		.int()
		.min(0, 'Games played must be a non-negative integer'),
	conferenceId: z.string().min(1, 'Conference selection is required'),
	primaryColor: z.string().min(1, 'Primary color is required'),
	secondaryColor: z.string().min(1, 'Secondary color is required'),
	seasonId: z.number().int().min(1, 'Season ID is required'),
})

export default function AddTeam() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const queryClient = useQueryClient()
	const query = useQuery({
		queryKey: ['conferences'],
		queryFn: async () => {
			const response = await fetch('http://localhost:3001/conferences')
			return response.json()
		},
		placeholderData: [],
	})

	const mutation = useMutation({
		mutationFn: async (team: z.infer<typeof formSchema>) => {
			const response = await fetch('http://localhost:3001/teams/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(team),
			})

			if (!response.ok) {
				throw new Error('Failed to add team')
			}
		},
		onSuccess: (data, variables, context) => {
			console.log(data, variables, context)
			toast({
				title: 'Team submitted successfully',
				description: `${variables.name} has been added to the database.`,
			})
			form.reset()
		},
		onError: (error, variables, context) => {
			// An error happened!
			console.log(`rolling back optimistic update with id ${context.id}`)
		},
	})

	const conferences = query.data

	// console.log(conferences)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			abbreviation: '',
			mascot: '',
			wins: 0,
			losses: 0,
			ties: 0,
			gamesPlayed: 0,
			conferenceId: '',
			primaryColor: '',
			secondaryColor: '',
			seasonId: 1,
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		mutation.mutate(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full max-w-md mx-auto space-y-4'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Team Name</FormLabel>
							<FormControl>
								<Input placeholder='Enter team name' {...field} />
							</FormControl>
							<FormDescription>
								The official name of the college football team.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='abbreviation'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Team Abbreviation</FormLabel>
							<FormControl>
								<Input placeholder='Enter team abbreviation' {...field} />
							</FormControl>
							<FormDescription>
								The shortened name of the college football team.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='mascot'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mascot</FormLabel>
							<FormControl>
								<Input placeholder='Enter team mascot' {...field} />
							</FormControl>
							<FormDescription>
								The mascot or nickname of the team.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-3 gap-4'>
					<FormField
						control={form.control}
						name='primaryColor'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Primary Color</FormLabel>
								<FormControl>
									<Input placeholder='Enter team color' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='secondaryColor'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Secondary Color</FormLabel>
								<FormControl>
									<Input placeholder='Enter team color' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-4 gap-4'>
					<FormField
						control={form.control}
						name='wins'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Wins</FormLabel>
								<FormControl>
									<Input
										type='number'
										{...field}
										onChange={(e) =>
											field.onChange(Number.parseInt(e.target.value))
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='losses'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Losses</FormLabel>
								<FormControl>
									<Input
										type='number'
										{...field}
										onChange={(e) =>
											field.onChange(Number.parseInt(e.target.value))
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='ties'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ties</FormLabel>
								<FormControl>
									<Input
										type='number'
										{...field}
										onChange={(e) =>
											field.onChange(Number.parseInt(e.target.value))
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='gamesPlayed'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Games Played</FormLabel>
								<FormControl>
									<Input
										type='number'
										{...field}
										onChange={(e) =>
											field.onChange(Number.parseInt(e.target.value))
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='conferenceId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Conference</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a conference' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{conferences.map((conference) => (
										<SelectItem
											key={conference.id}
											value={conference.id.toString()}
										>
											{conference.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								The athletic conference to which the team belongs.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full' disabled={isSubmitting}>
					{isSubmitting ? 'Submitting...' : 'Submit Team'}
				</Button>
			</form>
		</Form>
	)
}

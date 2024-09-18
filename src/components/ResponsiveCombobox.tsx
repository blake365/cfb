'use client'

import { useState } from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export function ResponsiveComboBox({ label }: { label: string }) {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')
	const [selectedTeam, setselectedTeam] = useState(null)

	const query = useQuery({
		queryKey: ['teams'],
		queryFn: async () => {
			const response = await fetch('http://localhost:3001/teams')
			return response.json()
		},
		placeholderData: [],
	})

	const teams = query.data

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant='outline' className='min-w-60 justify-start'>
						{selectedTeam ? (
							<div className='flex items-center gap-2'>
								<Search className='h-4 w-4' />
								{selectedTeam.name}
							</div>
						) : (
							<div className='flex items-center gap-2'>
								<Search className='h-4 w-4 flex-1' />
								{label}
							</div>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0' align='start'>
					<StatusList
						setOpen={setOpen}
						setselectedTeam={setselectedTeam}
						list={teams}
					/>
				</PopoverContent>
			</Popover>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant='secondary' className='justify-center w-full'>
					{selectedTeam ? (
						<div className='flex items-center gap-2'>
							<Search className='h-4 w-4' />
							{selectedTeam.name}
						</div>
					) : (
						<div className='flex items-center gap-2'>
							<Search className='h-4 w-4' />
							{label}
						</div>
					)}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className='mt-4 border-t'>
					<StatusList
						setOpen={setOpen}
						setselectedTeam={setselectedTeam}
						list={teams}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

function StatusList({
	setOpen,
	setselectedTeam,
	list,
}: {
	setOpen: (open: boolean) => void
	setselectedTeam: (status) => void
	list: object[]
}) {
	const router = useRouter()

	return (
		<Command>
			<CommandInput placeholder='Filter teams...' />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{list.map((team) => (
						<CommandItem
							key={team.value}
							value={team.name}
							onSelect={() => {
								setselectedTeam(team)
								setOpen(false)
								router.push(`/teams/${team.name}`)
							}}
						>
							{team.name}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}

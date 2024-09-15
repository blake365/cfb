'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Menu, X } from 'lucide-react'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'

export default function TopNavBar() {
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const searchQuery = formData.get('search')
		console.log('Search query:', searchQuery)
		setIsSearchOpen(false)
		// In a real application, you would handle the search here
	}

	return (
		<nav className='bg-primary text-primary-foreground'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex items-center justify-between'>
					<Link href='/' className='text-xl font-bold sm:text-2xl'>
						Sickos
					</Link>

					{/* Desktop search */}
					<form
						onSubmit={handleSearch}
						className='hidden sm:flex items-center space-x-2'
					>
						<ThemeToggle />
						<div className='relative'>
							<Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
							<Input
								type='search'
								placeholder='Search...'
								name='search'
								className='pl-8 bg-primary-foreground text-primary w-64'
							/>
						</div>
						<Button type='submit' variant='outline'>
							Search
						</Button>
					</form>

					{/* Mobile menu and search */}
					<div className='flex items-center space-x-2 sm:hidden'>
						<ThemeToggle />
						<Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
							<SheetTrigger asChild>
								<Button variant='ghost' size='icon'>
									<Search className='h-5 w-5' />
									<span className='sr-only'>Open search</span>
								</Button>
							</SheetTrigger>
							<SheetContent side='top' className='w-full'>
								<SheetHeader>
									<SheetTitle>Search</SheetTitle>
									<SheetDescription>
										Enter your search query below
									</SheetDescription>
								</SheetHeader>
								<form onSubmit={handleSearch} className='mt-4 space-y-4'>
									<Input
										type='search'
										placeholder='Search...'
										name='search'
										className='w-full'
									/>
									<Button type='submit' className='w-full'>
										Search
									</Button>
								</form>
							</SheetContent>
						</Sheet>

						<Sheet>
							<SheetTrigger asChild>
								<Button variant='ghost' size='icon'>
									<Menu className='h-5 w-5' />
									<span className='sr-only'>Open menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side='right'>
								<SheetHeader>
									<SheetTitle>Menu</SheetTitle>
								</SheetHeader>
								<div className='mt-4 space-y-4'>
									<Button variant='ghost' className='w-full justify-start'>
										Home
									</Button>
									<Button variant='ghost' className='w-full justify-start'>
										Teams
									</Button>
									<Button variant='ghost' className='w-full justify-start'>
										Schedule
									</Button>
									<Button variant='ghost' className='w-full justify-start'>
										Stats
									</Button>
									<Button variant='ghost' className='w-full justify-start'>
										News
									</Button>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</nav>
	)
}

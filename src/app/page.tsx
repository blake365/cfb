import Image from 'next/image'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import ScheduleView from '@/components/ScheduleView'
import { UpcomingGameCard } from '@/components/upcoming-game-card'

export default function Home() {
	return (
		<main className='flex flex-col items-center justify-between min-h-screen p-24'>
			<UpcomingGameCard />
			<ScheduleView />
		</main>
	)
}

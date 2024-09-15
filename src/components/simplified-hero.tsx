import { MoveDown } from 'lucide-react'

export function SimplifiedHero() {
	return (
		<div className='flex items-center justify-center'>
			<div className='container mx-auto px-4 pt-10 pb-4 text-center'>
				<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
					College Football Sickos
				</h1>
				<p className='text-xl md:text-2xl mb-8 max-w-2xl mx-auto'>
					Your destination for which college football games to watch each week.
					Check schedules, scores, and rate match ups.
				</p>
			</div>
		</div>
	)
}

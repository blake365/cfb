'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

const reactions = [
	{ emoji: '👀', name: 'Watch This' },
	{ emoji: '🤢', name: 'Sicko' },
	{ emoji: '🔥', name: 'Fire' },
	{ emoji: '😡', name: 'Upset Alert' },
]

export function CompactReactionSelector() {
	const [reactionCounts, setReactionCounts] = useState<{
		[key: string]: number
	}>(Object.fromEntries(reactions.map((r) => [r.emoji, 0])))

	const handleReaction = (emoji: string) => {
		setReactionCounts((prev) => ({
			...prev,
			[emoji]: prev[emoji] + 1,
		}))
	}

	return (
		<TooltipProvider>
			<div className='inline-flex items-center space-x-1 rounded-full p-1'>
				{reactions.map(({ emoji, name }) => (
					<Tooltip key={emoji}>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='sm'
								className='h-8 px-2 rounded-full relative hover:scale-150'
								onClick={() => handleReaction(emoji)}
							>
								<span className='text-base'>{emoji}</span>
								{reactionCounts[emoji] > 0 && (
									<span className='absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center'>
										{reactionCounts[emoji]}
									</span>
								)}
								<span className='sr-only'>React with {name}</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent side='bottom'>
							<p>{name}</p>
						</TooltipContent>
					</Tooltip>
				))}
			</div>
		</TooltipProvider>
	)
}

import React, { useState, useEffect } from 'react'
import '../../public/globals.css'

interface EmojiRainProps {
	emoji: string
	duration?: number
}

const EmojiRain: React.FC<EmojiRainProps> = ({ emoji, duration = 3000 }) => {
	const [emojis, setEmojis] = useState<
		{ id: number; style: React.CSSProperties }[]
	>([])

	useEffect(() => {
		const newEmojis = Array.from({ length: 30 }, (_, i) => ({
			id: i,
			style: {
				left: `${Math.random() * 100}%`,
				// top: `${Math.random() * 20 - 20}%`,
				animationDuration: `${Math.random() * 1 + 3}s`,
				// animationDelay: `${Math.random() * 0.5}s`,
			},
		}))

		setEmojis(newEmojis)

		const timer = setTimeout(() => {
			setEmojis([])
		}, duration)

		return () => clearTimeout(timer)
	}, [emoji, duration])

	return (
		<div className='absolute inset-x-2.5 inset-y-0 overflow-hidden pointer-events-none'>
			{emojis.map((item) => (
				<div key={item.id} className='emoji' style={item.style}>
					{emoji}
				</div>
			))}
		</div>
	)
}

export default EmojiRain

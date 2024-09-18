'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ReturnToTopButton() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			// Show button when page is scrolled 300px
			if (window.pageYOffset > 300) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		// Add scroll event listener
		window.addEventListener('scroll', toggleVisibility)

		// Clean up the event listener on component unmount
		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<>
			{isVisible && (
				<Button
					className='fixed bottom-4 right-4 p-2 rounded-full shadow-lg transition-opacity duration-300 z-50'
					onClick={scrollToTop}
					aria-label='Return to top'
				>
					<ChevronUp className='h-6 w-6' />
				</Button>
			)}
		</>
	)
}

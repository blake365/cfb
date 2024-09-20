'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

interface FavoriteButtonProps {
	teamId: string
	teamName: string
	logo: string
	primaryColor: string
	secondaryColor: string
	abbreviation: string
}

export function FavoriteButtonComponent({
	teamId,
	teamName,
	logo,
	primaryColor,
	secondaryColor,
	abbreviation,
}: FavoriteButtonProps) {
	const [isFavorite, setIsFavorite] = useState(false)
	const queryClient = useQueryClient()

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favoriteTeams') || '[]')
		setIsFavorite(favorites.some((team: { id: string }) => team.id === teamId))
	}, [teamId])

	const toggleFavorite = () => {
		let favorites = JSON.parse(localStorage.getItem('favoriteTeams') || '[]')

		if (isFavorite) {
			favorites = favorites.filter((team: { id: string }) => team.id !== teamId)
		} else {
			favorites.push({
				id: teamId,
				name: teamName,
				logo,
				primaryColor,
				secondaryColor,
				abbreviation,
			})
		}

		localStorage.setItem('favoriteTeams', JSON.stringify(favorites))
		setIsFavorite(!isFavorite)

		queryClient.invalidateQueries({ queryKey: ['favoriteTeams'] })
	}

	return (
		<Button
			variant={isFavorite ? 'favorite' : 'favoriteOutline'}
			size='icon'
			onClick={toggleFavorite}
			aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
		>
			<Heart className={isFavorite ? 'fill-current' : ''} />
		</Button>
	)
}

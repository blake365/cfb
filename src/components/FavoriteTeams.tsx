'use client'

import { useQuery } from '@tanstack/react-query'
import { AvatarGroupComponent } from './avatar-group'

function getFavorites() {
	return JSON.parse(localStorage.getItem('favoriteTeams') || '[]')
}

function FavoriteTeams() {
	const { data: favorites } = useQuery({
		queryKey: ['favoriteTeams'],
		queryFn: getFavorites,
	})

	// console.log('favorites', favorites)

	return (
		<div>
			<AvatarGroupComponent avatars={favorites || []} maxAvatars={10} />
		</div>
	)
}

export default FavoriteTeams

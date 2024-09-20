import AddGame from '@/components/AddGame'
import AddTeam from '@/components/AddTeam'
import React from 'react'

export default function page() {
	return (
		<>
			<div>Add Teams and Games</div>
			<AddTeam />
			<AddGame />
		</>
	)
}

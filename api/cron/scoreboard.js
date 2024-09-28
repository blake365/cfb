export const edge = true

export default async function handler(request, response) {

	// get scoreboard data
	const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/scoreboard/fillScoreboard`)
	const data = await result.json()

	return response.json(data)
}

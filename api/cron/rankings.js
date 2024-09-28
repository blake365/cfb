//  update rankings
export const edge = true

export default async function handler(request, response) {

	const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/teams/updateRankings/hello`)
	const data = await result.json()

	return response.json(data)
}
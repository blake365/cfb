//  update interest scores
export const edge = true

export default async function handler(request, response) {

	const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cron/updateInterestScores`)
	const data = await result.json()

	return response.json(data)
}
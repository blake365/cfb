//  update media and betting info
export const edge = true

export default async function handler(request, response) {

	const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/getMediaInformation/hello`)

	const result2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/getBettingLines/hello`)


	const result3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cron/updateInterestScores`)

	const data = await result.json()
	const data2 = await result2.json()
	const data3 = await result3.json()
	
	return response.json({ data, data2, data3 })
}
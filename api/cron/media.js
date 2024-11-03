//  update media and betting info
export const edge = true

export default async function handler(request, response) {

	await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/games/getMediaInformation/hello`)

	await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/games/getBettingLines/hello`)

	await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cron/updateInterestScores`)

	return response.json({ message: "Media, betting, and interest scores update sent" });
}

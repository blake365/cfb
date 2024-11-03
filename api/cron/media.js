//  update media and betting info
export const edge = true

export default async function handler(request, response) {

	fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/games/getMediaInformation/hello`)

	fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/games/getBettingLines/hello`)

	fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cron/updateInterestScores`)

	return response.json({ message: "Media, betting, and interest scores update sent" });
}

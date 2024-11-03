export const edge = true

export default async function handler(request, response) {

	// get scoreboard data
	fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/scoreboard/fillScoreboard`)

	return response.json({ message: "Scoreboard update sent" });
}

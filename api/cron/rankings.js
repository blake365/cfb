//  update rankings
export const edge = true

export default async function handler(request, response) {

	await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/teams/updateRankings/hello`)

	return response.json({ message: "Rankings update sent" });
}

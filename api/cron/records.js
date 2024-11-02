//  update records
export const edge = true

export default async function handler(request, response) {

	const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/teams/updateRecords`)

	return response.status(result.status)
}
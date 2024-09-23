//  update records
export const edge = true

export default async function handler(request, response) {

	const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/updateRecords/hello`)
	const data = await result.json()

	return response.json(data)
}
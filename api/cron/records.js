//  update records
export const edge = true

export default async function handler(request, response) {

	await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/teams/updateRecords/hello`)

	return response.json({ message: "Record update sent" });
}
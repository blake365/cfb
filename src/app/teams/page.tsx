export async function generateStaticParams() {
	const teams = await fetch('http://localhost:3001/teams').then((res) =>
		res.json()
	)

	console.log(teams)

	return teams.map((team) => ({
		slug: team.name,
	}))
}

export default function Page({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	return <h1>{params.slug}</h1>
}

import { TinyTeamCard } from "@/components/tiny-team-card";

export default async function WeeksLayout({
	params,
	children,
}: {
	params: { slug: string };
	children: React.ReactNode;
}) {
	const conference = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/conferences/${params.slug}`,
		{ next: { revalidate: 3600 } },
	);
	const conferenceData = await conference.json();

	return (
		<section className="flex flex-col items-center min-h-screen mx-4">
			<div className="w-full max-w-4xl text-center my-8">
				<h1 className="text-4xl font-bold mb-2">{conferenceData.fullName}</h1>
			</div>
			<div className="flex flex-row flex-wrap w-full gap-4 items-center mb-4 justify-center">
				{conferenceData.teams.map((team) => (
					<TinyTeamCard key={team.id} team={team} size={12} />
				))}
			</div>
			{children}
		</section>
	);
}

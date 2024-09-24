import { UpcomingGameCard } from "@/components/upcoming-game-card";
import TeamStats from "@/components/TeamStats";

export default async function Page({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	// console.log(params.slug)
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/team/${params.slug}`,
	);
	const games = await data.json();

	const team = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/teams/name/${params.slug}`,
	);
	const teamData = await team.json();
	// console.log(teamData);

	return (
		<main className="flex flex-col items-center min-h-screen mx-4">
			<TeamStats teamData={teamData} />
			<div className="flex flex-col w-full gap-10 items-center mb-20">
				{games.map((game) => (
					<UpcomingGameCard key={game.id} game={game} pageType="team" />
				))}
			</div>
		</main>
	);
}

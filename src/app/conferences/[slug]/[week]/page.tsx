import { UpcomingGameCard } from "@/components/upcoming-game-card";
import WeekHeader from "@/components/WeekHeader";

export default async function Page({
	params,
}: {
	params: { slug: string; week: string };
}) {
	// console.log(params.slug)
	// console.log(params.week)

	const games = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/conference/${params.slug}/${params.week}`,
		{
			cache: "no-store",
		},
	);
	const gamesData = await games.json();
	// console.log(gamesData)

	// console.log(teamData)
	return (
		<main className="flex flex-col items-center min-h-screen mx-4">
			<WeekHeader
				week={{ week: Number.parseInt(params.week) }}
				nested={`conferences/${params.slug}`}
			>
				<div className="flex flex-col w-full gap-10 items-center mb-10">
					{gamesData.map((game) => (
						<UpcomingGameCard key={game.id} game={game} />
					))}
				</div>
			</WeekHeader>
		</main>
	);
}

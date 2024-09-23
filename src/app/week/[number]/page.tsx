import { UpcomingGameCard } from "@/components/upcoming-game-card";
import WeekHeader from "@/components/WeekHeader";

export default async function Page({ params }: { params: { number: string } }) {
	// console.log(params.number)
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/week/${params.number}`,
		{
			cache: "no-store",
		},
	);
	const games = await data.json();

	// console.log(teamData)

	return (
		<main className="flex flex-col items-center min-h-screen mx-4">
			<WeekHeader week={{ week: Number(params.number) }}>
				<div className="flex flex-col w-full gap-10 items-center mb-10">
					{games.map((game) => (
						<UpcomingGameCard key={game.id} game={game} />
					))}
				</div>
			</WeekHeader>
		</main>
	);
}

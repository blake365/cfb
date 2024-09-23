import weeks from "@/lib/weeks";
import { UpcomingGameCard } from "@/components/upcoming-game-card";

async function GameFeed() {
	const now = new Date().getTime();
	const currentWeek = weeks.find((week) => {
		return now >= week.startDate.getTime() && now <= week.endDate.getTime();
	});

	const data = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/week/${currentWeek.week}`,
		{
			cache: "no-store",
		},
	);
	const games = await data.json();

	// console.log(games[10]);

	return (
		<div className="flex flex-col gap-10">
			{games.map((game) => (
				<UpcomingGameCard key={game.id} game={game} />
			))}
		</div>
	);
}

export default GameFeed;

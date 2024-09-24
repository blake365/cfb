import { SimplifiedHero } from "@/components/simplified-hero";
import { Suspense } from "react";
import GameFeed from "@/components/GameFeed";
import weeks from "@/lib/weeks";
import GameFeedSkeleton from "@/components/GameFeedSkeleton";

export default async function Home() {
	const now = new Date().getTime();
	const currentWeek = weeks.find((week) => {
		return now >= week.startDate.getTime() && now <= week.endDate.getTime();
	});

	const data = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/week/${currentWeek.week}`,
	);
	const games = await data.json();

	return (
		<main className="flex flex-col items-center min-h-screen mx-4">
			<SimplifiedHero />
			<Suspense fallback={<GameFeedSkeleton />}>
				<div className="flex flex-col w-full items-center mb-10">
					<GameFeed initialGames={games} week={currentWeek} />
				</div>
			</Suspense>
		</main>
	);
}

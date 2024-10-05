"use client";

import { SimplifiedHero } from "@/components/simplified-hero";
import GameFeed from "@/components/GameFeed";
import weeks from "@/lib/weeks";
import GameFeedSkeleton from "@/components/GameFeedSkeleton";

import { useQuery } from "@tanstack/react-query";

const fetchGames = async (week) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/week/${week}`,
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

export default function Home() {
	const now = new Date().getTime();
	const week = weeks.find((week) => {
		return now >= week.startDate.getTime() && now <= week.endDate.getTime();
	});
	const currentWeek = week.week;

	const {
		data: games,
		status,
		isFetching,
		error,
	} = useQuery({
		queryKey: ["games", currentWeek],
		queryFn: () => fetchGames(currentWeek),
		enabled: !!currentWeek,
		refetchInterval: 1000 * 60 * 1,
	});

	// console.log(games);

	if (error) return <div>An error occurred: {error.message}</div>;

	return (
		<main className="flex flex-col items-center min-h-screen ">
			<SimplifiedHero />
			<div className="flex flex-col items-center mb-10">
				{status === "pending" ? (
					<GameFeedSkeleton />
				) : (
					<GameFeed initialGames={games} week={week} />
				)}
			</div>
		</main>
	);
}

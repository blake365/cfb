"use client";

import { Suspense } from "react";
import GameFeedSkeleton from "@/components/GameFeedSkeleton";
import GameFeed from "@/components/GameFeed";
import weeks from "@/lib/weeks";
import { useQuery } from "@tanstack/react-query";

const fetchGames = async (conference, week) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/conference/${conference}/${week}`,
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

export default function Page({ params }: { params: { slug: string } }) {
	// console.log(params.slug)
	const now = new Date().getTime();
	const currentWeek = weeks.find((week) => {
		return now >= week.startDate.getTime() && now <= week.endDate.getTime();
	});

	const {
		data: gamesData,
		status,
		isFetching,
		error,
	} = useQuery({
		queryKey: ["conference games", currentWeek.week],
		queryFn: () => fetchGames(params.slug, currentWeek.week),
		enabled: !!params.slug,
		refetchInterval: 1000 * 60 * 1,
	});

	if (error) return <div>An error occurred: {error.message}</div>;
	// console.log(gamesData)

	return (
		<main className="flex flex-col items-center min-h-screen mx-4">
			<div className="flex flex-col w-full items-center mb-10">
				{status === "pending" ? (
					<GameFeedSkeleton />
				) : (
					<GameFeed
						initialGames={gamesData}
						week={currentWeek.week}
						nested={`conferences/${params.slug}`}
					/>
				)}
			</div>
		</main>
	);
}

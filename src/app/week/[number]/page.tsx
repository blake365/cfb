"use client";

import GameFeed from "@/components/GameFeed";
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

export default function Page({ params }: { params: { number: string } }) {
	const {
		data: games,
		status,
		isFetching,
		error,
	} = useQuery({
		queryKey: ["week games", params.number],
		queryFn: () => fetchGames(params.number),
		refetchInterval: 1000 * 60 * 1,
	});

	// console.log(teamData)
	if (error) return <div>An error occurred: {error.message}</div>;

	return (
		<main className="flex flex-col items-center min-h-screen mx-4">
			<div className="flex flex-col items-center mb-10">
				{status === "pending" ? (
					<GameFeedSkeleton />
				) : (
					<GameFeed
						initialGames={games}
						week={{ week: Number(params.number) }}
					/>
				)}
			</div>
		</main>
	);
}

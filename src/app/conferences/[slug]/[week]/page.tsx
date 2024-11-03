"use client";
import { Suspense } from "react";
import GameFeedSkeleton from "@/components/GameFeedSkeleton";
import GameFeed from "@/components/GameFeed";
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

export default function Page({
	params,
}: {
	params: { slug: string; week: string };
}) {
	console.log(params.slug);
	console.log(params.week);

	const {
		data: gamesData,
		status,
		isFetching,
		error,
	} = useQuery({
		queryKey: ["conference games", params.week],
		queryFn: () => fetchGames(params.slug, params.week),
		enabled: !!params.slug,
		refetchInterval: 1000 * 60 * 5,
	});

	if (error) return <div>An error occurred: {error.message}</div>;

	return (
		<main className="flex flex-col items-center min-h-screen mx-4">
			<div className="flex flex-col w-full items-center mb-10">
				{status === "pending" ? (
					<GameFeedSkeleton />
				) : (
					<GameFeed
						initialGames={gamesData}
						week={{ week: Number.parseInt(params.week) }}
						nested={`conferences/${params.slug}`}
					/>
				)}
			</div>
		</main>
	);
}

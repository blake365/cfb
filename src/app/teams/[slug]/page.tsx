"use client";

import TeamStats from "@/components/TeamStats";
import { useQuery } from "@tanstack/react-query";
import GameFeedSkeleton from "@/components/GameFeedSkeleton";
import GameFeed from "@/components/GameFeed";
import weeks from "@/lib/weeks";
const fetchGames = async (slug) => {
	console.log("i am fetching games");
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/team/${slug}`,
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

const fetchTeamStats = async (slug) => {
	console.log("i am fetching team stats");
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/teams/name/${slug}`,
	);
	return response.json();
};

export default function Page({
	params,
}: {
	params: { slug: string };
}) {
	const {
		data: games,
		status,
		error,
	} = useQuery({
		queryKey: ["team games", params.slug],
		queryFn: () => fetchGames(params.slug),
		refetchOnMount: true,
		refetchInterval: 1000 * 60 * 5,
	});

	const now = new Date().getTime();
	const week = weeks.find((week) => {
		return now >= week.startDate.getTime() && now <= week.endDate.getTime();
	});

	const {
		data: teamData,
		status: teamStatus,
		error: teamError,
	} = useQuery({
		queryKey: ["team stats", params.slug],
		queryFn: () => fetchTeamStats(params.slug),
	});

	// console.log(teamData);

	if (error) return <div>An error occurred: {error.message}</div>;

	if (teamError) return <div>An error occurred: {teamError.message}</div>;

	return (
		<main className="flex flex-col items-center min-h-screen mx-auto max-w-4xl ">
			{teamStatus === "success" && <TeamStats teamData={teamData} />}
			<div className="flex flex-col items-center mb-20">
				{status === "pending" ? (
					<GameFeedSkeleton />
				) : (
					<GameFeed
						teamPage={true}
						initialGames={games}
						week={week}
						nested={`teams/${params.slug}`}
					/>
				)}
			</div>
		</main>
	);
}

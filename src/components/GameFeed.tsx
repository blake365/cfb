"use client";

import { UpcomingGameCard } from "@/components/upcoming-game-card";
import { useState, useEffect } from "react";
import WeekHeader from "@/components/WeekHeader";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

// Function to get the initial sort state
const getSortState = () => {
	return {
		sortKey: "interestScore",
		sortOrder: "desc",
	};
};

function GameFeed({ initialGames, week, nested }) {
	const [matchups, setMatchups] = useState(initialGames);

	const queryClient = useQueryClient();

	const { data: sortState } = useQuery({
		queryKey: ["sortState"],
		queryFn: getSortState,
		initialData: getSortState,
	});

	// access the favorite teams from react query
	const { data: favoriteTeams } = useQuery({
		queryKey: ["favoriteTeams"],
	});

	// console.log("favoriteTeams", favoriteTeams);

	useEffect(() => {
		if (!sortState) return;

		const sortedMatchups = [...matchups].sort((a, b) => {
			// Ensure favoriteTeams is an array
			if (
				Array.isArray(favoriteTeams) &&
				sortState.sortKey === "interestScore"
			) {
				const aIsFavorite = favoriteTeams.some(
					(team) =>
						team.name === a.homeTeamName || team.name === a.awayTeamName,
				);
				const bIsFavorite = favoriteTeams.some(
					(team) =>
						team.name === b.homeTeamName || team.name === b.awayTeamName,
				);

				if (aIsFavorite && !bIsFavorite) return -1;
				if (!aIsFavorite && bIsFavorite) return 1;
			}

			if (a[sortState.sortKey] < b[sortState.sortKey])
				return sortState.sortOrder === "asc" ? -1 : 1;
			if (a[sortState.sortKey] > b[sortState.sortKey])
				return sortState.sortOrder === "asc" ? 1 : -1;
			return 0;
		});

		setMatchups(sortedMatchups);
	}, [sortState, favoriteTeams]);

	const handleSort = (key: string) => {
		const newSortOrder = sortState.sortOrder === "asc" ? "desc" : "asc";
		const newSortState = { sortKey: key, sortOrder: newSortOrder };
		queryClient.setQueryData(["sortState"], newSortState);
	};

	return (
		<div className="w-full">
			<WeekHeader
				week={week}
				sortKey={sortState?.sortKey}
				sortOrder={sortState?.sortOrder}
				onSort={handleSort}
				nested={nested}
			/>
			<div className="flex flex-col gap-10 mt-4 mx-4">
				{matchups.map((game) => (
					<UpcomingGameCard key={game.id} game={game} />
				))}
			</div>
		</div>
	);
}

export default GameFeed;

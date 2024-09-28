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
	});

	useEffect(() => {
		if (!sortState) return;

		const sortedMatchups = [...matchups].sort((a, b) => {
			if (a[sortState.sortKey] < b[sortState.sortKey])
				return sortState.sortOrder === "asc" ? -1 : 1;
			if (a[sortState.sortKey] > b[sortState.sortKey])
				return sortState.sortOrder === "asc" ? 1 : -1;
			return 0;
		});
		setMatchups(sortedMatchups);
	}, [sortState]);

	const handleSort = (key: string) => {
		const newSortOrder = sortState.sortOrder === "asc" ? "desc" : "asc";
		const newSortState = { sortKey: key, sortOrder: newSortOrder };
		queryClient.setQueryData(["sortState"], newSortState);
	};

	return (
		<>
			<WeekHeader
				week={week}
				sortKey={sortState?.sortKey}
				sortOrder={sortState?.sortOrder}
				onSort={handleSort}
				nested={nested}
			/>
			<div className="flex flex-col gap-10">
				{matchups.map((game) => (
					<UpcomingGameCard key={game.id} game={game} />
				))}
			</div>
		</>
	);
}

export default GameFeed;

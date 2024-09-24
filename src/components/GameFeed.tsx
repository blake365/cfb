"use client";

import { UpcomingGameCard } from "@/components/upcoming-game-card";
import { useState, useEffect } from "react";
import WeekHeader from "@/components/WeekHeader";

function GameFeed({ initialGames, week, nested }) {
	const [matchups, setMatchups] = useState(initialGames);
	const [sortKey, setSortKey] = useState("interestScore");
	const [sortOrder, setSortOrder] = useState("desc");

	useEffect(() => {
		const sortedMatchups = [...matchups].sort((a, b) => {
			// console.log(a[sortKey]);
			if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
			if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
			return 0;
		});
		setMatchups(sortedMatchups);
	}, [sortKey, sortOrder]);

	const handleSort = (key: string) => {
		setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
		setSortKey(key);
	};

	return (
		<>
			<WeekHeader
				week={week}
				sortKey={sortKey}
				sortOrder={sortOrder}
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

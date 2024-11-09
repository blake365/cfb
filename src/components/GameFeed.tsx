"use client";

import { UpcomingGameCard } from "@/components/upcoming-game-card";
import { useState, useEffect } from "react";
import WeekHeader from "@/components/WeekHeader";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "./ui/table";
import { GameTableRow } from "./gameTableRow";
import { CalendarDays, Clock, MapPin, Tv } from "lucide-react";
// Function to get the initial sort state
const getSortState = () => {
	return {
		sortKey: "interestScore",
		sortOrder: "desc",
	};
};

const getTeamPageSortState = () => {
	return {
		sortKey: "date",
		sortOrder: "asc",
	};
};

const getView = () => {
	return JSON.parse(localStorage.getItem("view"));
};

function GameFeed({ initialGames, week, nested, teamPage }) {
	const [matchups, setMatchups] = useState(initialGames);

	const queryClient = useQueryClient();

	const { data: sortState } = useQuery({
		queryKey: ["sortState"],
		queryFn: teamPage ? getTeamPageSortState : getSortState,
		initialData: teamPage ? getTeamPageSortState : getSortState,
	});

	const { data: view } = useQuery({
		queryKey: ["view"],
		queryFn: getView,
	});

	// console.log("view", view);

	// access the favorite teams from react query
	const { data: favoriteTeams } = useQuery({
		queryKey: ["favoriteTeams"],
	});

	let poll = "AP";
	if (week.week >= 11) {
		poll = "CFP";
	}

	useEffect(() => {
		if (!sortState) return;

		if (teamPage) {
			sortState.sortKey = "date";
			sortState.sortOrder = "asc";
		}

		const sortedMatchups = [...matchups].sort((a, b) => {
			// Ensure favoriteTeams is an array
			if (
				!teamPage &&
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

	if (view === "table") {
		return (
			<div className="w-full">
				{!teamPage && (
					<WeekHeader
						week={week}
						sortKey={sortState?.sortKey}
						sortOrder={sortState?.sortOrder}
						onSort={handleSort}
						nested={nested}
					/>
				)}
				<div className="mt-4 mx-4">
					<div className="max-w-sm sm:max-w-2xl lg:max-w-3xl overflow-x-auto overflow-y-clip">
						<Table className="w-full overflow-y-clip">
							<TableHeader>
								<TableRow>
									<TableCell>Away Team</TableCell>
									<TableCell className="border-r border-muted">Score</TableCell>
									<TableCell>Home Team</TableCell>
									<TableCell className="border-r border-muted">Score</TableCell>
									<TableCell className="border-r border-muted">Rival</TableCell>
									<TableCell className="border-r border-muted">Date</TableCell>
									<TableCell className="border-r border-muted">Time</TableCell>
									<TableCell className="border-r border-muted">
										Outlet
									</TableCell>
									<TableCell className="border-r border-muted">
										Spread
									</TableCell>
									<TableCell>Over/Under</TableCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								{matchups.map((game) => (
									<GameTableRow key={game.id} game={game} poll={poll} />
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full">
			{!teamPage && (
				<WeekHeader
					week={week}
					sortKey={sortState?.sortKey}
					sortOrder={sortState?.sortOrder}
					onSort={handleSort}
					nested={nested}
				/>
			)}
			<div className="flex flex-col gap-10 mt-4 mx-4">
				{matchups.map((game) => (
					<UpcomingGameCard key={game.id} game={game} poll={poll} />
				))}
			</div>
		</div>
	);
}

export default GameFeed;

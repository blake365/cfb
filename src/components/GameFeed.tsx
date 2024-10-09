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

const getView = () => {
	return JSON.parse(localStorage.getItem("view"));
};

function GameFeed({ initialGames, week, nested }) {
	const [matchups, setMatchups] = useState(initialGames);

	const queryClient = useQueryClient();

	const { data: sortState } = useQuery({
		queryKey: ["sortState"],
		queryFn: getSortState,
		initialData: getSortState,
	});

	const { data: view } = useQuery({
		queryKey: ["view"],
		queryFn: getView,
	});

	console.log("view", view);

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

	if (view === "table") {
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
					<div className="max-w-sm md:max-w-2xl lg:max-w-3xl overflow-x-scroll">
						<Table className="">
							<TableHeader>
								<TableRow>
									<TableCell>Away Team</TableCell>
									<TableCell>Away Score</TableCell>
									<TableCell>Home Team</TableCell>
									<TableCell>Home Score</TableCell>
									<TableCell>Rival</TableCell>
									<TableCell>
										<div className="flex flex-row items-center">
											<CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />
											Date
										</div>
									</TableCell>
									<TableCell>
										<div className="flex flex-row items-center">
											<Clock className="h-4 w-4 mr-1 text-muted-foreground" />
											Time
										</div>
									</TableCell>
									<TableCell>
										<div className="flex flex-row items-center">
											<Tv className="h-4 w-4 mr-1 text-muted-foreground" />
											Media
										</div>
									</TableCell>
									{/* <TableCell>
									<div className="flex flex-row items-center">
										<MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
										Venue
									</div>
								</TableCell> */}
									<TableCell>Spread</TableCell>
									<TableCell>Over/Under</TableCell>
									<TableCell>Interest Score</TableCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								{matchups.map((game) => (
									<GameTableRow key={game.id} game={game} />
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

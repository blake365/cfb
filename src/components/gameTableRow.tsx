"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, MapPin, Tv, Monitor } from "lucide-react";
import { CompactReactionSelector } from "./compact-reaction-selector";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Scoreboard } from "./scoreboard";
import { useQuery } from "@tanstack/react-query";
import { TableCell, TableRow } from "@/components/ui/table";

function hexToRgb(hex: string) {
	hex = hex.replace(/^#/, "");

	// Parse r, g, b values
	let bigint = parseInt(hex, 16);
	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;

	return `${r}, ${g}, ${b}`;
}

export function GameTableRow({ game, pageType }) {
	if (!game) {
		return <div>No game data available</div>;
	}

	// console.log(game.interestScore);
	let winner = null;
	if (game.awayTeamScore !== null && game.homeTeamScore !== null) {
		winner = game.awayTeamScore > game.homeTeamScore ? "away" : "home";
	}

	// console.log(
	// 	`${game.team_awayTeamId.name} @ ${game.team_homeTeamId.name}`,
	// 	game.interestScore,
	// );

	const { data: favoriteTeams } = useQuery({
		queryKey: ["favoriteTeams"],
	});

	let favInGame = false;
	let favIsAway = false;
	let favIsHome = false;
	if (favoriteTeams && Array.isArray(favoriteTeams)) {
		favInGame = favoriteTeams.some(
			(team) =>
				team.name === game.team_awayTeamId.name ||
				team.name === game.team_homeTeamId.name,
		);

		for (const team of favoriteTeams) {
			if (team.name === game.team_awayTeamId.name) {
				favIsAway = true;
			}
		}

		for (const team of favoriteTeams) {
			if (team.name === game.team_homeTeamId.name) {
				favIsHome = true;
			}
		}
	}

	return (
		<TableRow
			subRow={
				<CompactReactionSelector
					gameId={game.id}
					table
					interestScore={game.interestScore}
				/>
			}
		>
			<TableCell className="max-w-[140px]">
				<div
					className={`flex flex-row items-center p-1 ${
						winner === "away" &&
						"border border-green-500 bg-green-500/10 rounded-3xl"
					}`}
				>
					<Avatar className="h-5 w-5 mr-1">
						<AvatarImage
							className="overflow-visible"
							src={game.team_awayTeamId.logo}
							alt={`${game.team_awayTeamId.name} logo`}
						/>
					</Avatar>
					<Link
						href={`/teams/${game.team_awayTeamId.name}`}
						className="font-semibold hover:underline "
					>
						{game.team_awayTeamId.apRank &&
							`(#${game.team_awayTeamId.apRank}) `}
						{game.team_awayTeamId.name}
					</Link>
				</div>
				<div className="flex flex-wrap">
					<span className="text-muted-foreground text-xs">
						Record: {game.team_awayTeamId.wins} - {game.team_awayTeamId.losses}
					</span>
					<span className="text-muted-foreground text-xs">
						Conf: {game.team_awayTeamId.conferenceWins} -{" "}
						{game.team_awayTeamId.conferenceLosses}
					</span>
				</div>
			</TableCell>
			<TableCell className="border-r border-muted text-center">
				{game.awayTeamScore}
			</TableCell>
			<TableCell className="max-w-[140px]">
				<div
					className={`flex flex-row font-semibold items-center p-1 ${
						winner === "home" &&
						"border border-green-500 bg-green-500/10 rounded-3xl"
					}`}
				>
					<Avatar className="h-5 w-5 mr-1">
						<AvatarImage
							src={game.team_homeTeamId.logo}
							alt={`${game.team_homeTeamId.name} logo`}
						/>
					</Avatar>
					<Link
						href={`/teams/${game.team_homeTeamId.name}`}
						className="hover:underline"
					>
						{game.team_homeTeamId.apRank &&
							`(#${game.team_homeTeamId.apRank}) `}
						{game.team_homeTeamId.name}
					</Link>
				</div>
				<div className="flex flex-wrap">
					<span className="text-muted-foreground text-xs mr-1">
						Record: {game.team_homeTeamId.wins} - {game.team_homeTeamId.losses}
					</span>
					<span className="text-muted-foreground text-xs">
						Conf: {game.team_homeTeamId.conferenceWins} -{" "}
						{game.team_homeTeamId.conferenceLosses}
					</span>
				</div>
			</TableCell>
			<TableCell className="border-r border-muted text-center">
				{game.homeTeamScore}
			</TableCell>
			<TableCell className="border-r border-muted">
				{game.rivalry ? (
					<span className="text-xl text-muted-foreground">😡</span>
				) : (
					""
				)}
			</TableCell>
			<TableCell className=" text-xs border-r border-muted">
				{new Date(game.gameStart).toLocaleDateString("en-US", {
					weekday: "long",
					month: "long",
					day: "numeric",
				})}
			</TableCell>
			<TableCell className=" text-xs border-r border-muted">
				{new Date(game.gameStart).toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</TableCell>
			<TableCell className=" text-xs border-r border-muted">
				{game.tvNetwork?.toUpperCase().slice(0, 6)}
			</TableCell>
			{/* <TableCell className=" text-xs">
				<span>{game.location}</span>
			</TableCell> */}
			<TableCell className=" text-xs border-r border-muted">
				{game.spread}
			</TableCell>
			<TableCell className=" text-xs">{game.overUnder}</TableCell>
		</TableRow>
	);
}
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, MapPin, Tv, Monitor } from "lucide-react";
import { CompactReactionSelector } from "./compact-reaction-selector";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Scoreboard } from "./scoreboard";
import { useQuery } from "@tanstack/react-query";

function hexToRgb(hex: string) {
	hex = hex.replace(/^#/, "");

	// Parse r, g, b values
	let bigint = parseInt(hex, 16);
	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;

	return `${r}, ${g}, ${b}`;
}

export function UpcomingGameCard({ game, pageType, poll }) {
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

	// console.log(game.team_awayTeamId);

	return (
		<div
			className="relative w-full max-w-2xl"
			style={{
				boxShadow: favInGame
					? `0 0 10px 5px rgba(${
							favIsHome
								? hexToRgb(game.team_homeTeamId.primaryColor)
								: hexToRgb(game.team_awayTeamId.primaryColor)
						}, 0.7)`
					: "none", // Add glow effect
				borderRadius: "1rem",
			}}
		>
			<Card className="w-full border-slate-800 px-4 pt-4 bg-muted">
				<CardContent className="">
					{pageType === "team" && (
						<div className="text-sm text-muted-foreground">
							Week {game.week}
						</div>
					)}
					<div className="flex justify-center items-center">
						<div className="flex flex-row flex-1 justify-center space-x-4">
							<div
								className={`flex flex-col items-center p-1 ${
									winner === "away" &&
									"border border-green-500 bg-green-500/10 rounded-3xl"
								}`}
							>
								<Avatar className="h-12 w-12 font-bold">
									{poll === "AP" && game.team_awayTeamId.apRank ? (
										<Badge
											className="absolute top-6 right-12"
											style={{
												backgroundColor: game.team_awayTeamId.primaryColor,
											}}
										>
											#{game.team_awayTeamId.apRank}
										</Badge>
									) : poll === "CFP" && game.team_awayTeamId.cfpRank ? (
										<Badge
											className="absolute top-6 right-12"
											style={{
												backgroundColor: game.team_awayTeamId.primaryColor,
											}}
										>
											#{game.team_awayTeamId.cfpRank}
										</Badge>
									) : (
										""
									)}
									<AvatarImage
										className="overflow-visible"
										src={game.team_awayTeamId.logo}
										alt={`${game.team_awayTeamId.name} logo`}
									/>
									<AvatarFallback
										style={{
											// backgroundColor: game.team_awayTeamId.primaryColor,
											color: game.team_awayTeamId.primaryColor,
										}}
									>
										{game.team_awayTeamId.abbreviation}
									</AvatarFallback>
								</Avatar>
								<Link
									href={`/teams/${game.team_awayTeamId.name}`}
									className="font-semibold hover:underline text-center"
								>
									{game.team_awayTeamId.name}
								</Link>

								<span className="text-sm text-muted-foreground">
									{game.team_awayTeamId.wins} - {game.team_awayTeamId.losses} |{" "}
									{game.team_awayTeamId.conferenceWins} -{" "}
									{game.team_awayTeamId.conferenceLosses}
								</span>
								<span className="text-xl font-bold">{game.awayTeamScore}</span>
							</div>
						</div>
						<div className="text-center flex flex-col items-center justify-center">
							{game.rivalry ? (
								<span className="text-2xl text-muted-foreground">😡</span>
							) : (
								<span className="text-lg">at</span>
							)}
						</div>
						<div className="flex flex-row flex-1 justify-center space-x-4">
							<div
								className={`flex flex-col items-center px-2 py-1 ${
									winner === "home" &&
									"border border-green-500 bg-green-500/10 rounded-3xl"
								}`}
							>
								<Avatar className="h-12 w-12">
									{/* if poll is AP, show AP rank, if CFP, show cfp rank */}
									{poll === "AP" && game.team_homeTeamId.apRank ? (
										<Badge
											className="absolute top-6 left-12"
											style={{
												backgroundColor: game.team_homeTeamId.primaryColor,
											}}
										>
											#{game.team_homeTeamId.apRank}
										</Badge>
									) : poll === "CFP" && game.team_homeTeamId.cfpRank ? (
										<Badge
											className="absolute top-6 left-12"
											style={{
												backgroundColor: game.team_homeTeamId.primaryColor,
											}}
										>
											#{game.team_homeTeamId.cfpRank}
										</Badge>
									) : (
										""
									)}
									<AvatarImage
										src={game.team_homeTeamId.logo}
										alt={`${game.team_homeTeamId.name} logo`}
									/>
									<AvatarFallback
										className="font-bold"
										style={{
											// backgroundColor: game.team_homeTeamId.primaryColor,
											color: game.team_homeTeamId.primaryColor,
										}}
									>
										{game.team_homeTeamId.abbreviation}
									</AvatarFallback>
								</Avatar>
								<Link
									href={`/teams/${game.team_homeTeamId.name}`}
									className="font-semibold hover:underline text-center"
								>
									{game.team_homeTeamId.name}
								</Link>
								<span className="text-sm text-muted-foreground">
									{game.team_homeTeamId.wins} - {game.team_homeTeamId.losses} |{" "}
									{game.team_homeTeamId.conferenceWins} -{" "}
									{game.team_homeTeamId.conferenceLosses}
								</span>
								<span className="text-xl font-bold">{game.homeTeamScore}</span>
							</div>
						</div>
					</div>
					<Scoreboard
						gameId={game.id}
						homeTeamId={game.team_homeTeamId.cfbApiId}
						awayTeamId={game.team_awayTeamId.cfbApiId}
						gameStart={game.gameStart}
						gameCompleted={game.gameCompleted}
					/>
					<div className="pt-2 space-y-1">
						<div className="flex flex-row gap-x-4 flex-wrap mb-6">
							<div className="flex items-center text-sm">
								<CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>
									{new Date(game.gameStart).toLocaleDateString("en-US", {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</div>
							<div className="flex items-center text-sm">
								<Clock className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>
									{new Date(game.gameStart).toLocaleTimeString("en-US", {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</span>
							</div>
							<div className="flex items-center text-sm">
								{!game.mediaType ? (
									""
								) : game.mediaType !== "tv" ? (
									<Monitor className="h-4 w-4 mr-2 text-muted-foreground" />
								) : (
									<Tv className="h-4 w-4 mr-2 text-muted-foreground" />
								)}
								<span>{game.tvNetwork?.toUpperCase()}</span>
							</div>
							<div className="flex items-center text-sm">
								<MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>{game.location}</span>
							</div>
							{game.spread && (
								<div className="flex items-center text-sm">
									<span>
										<span className="text-muted-foreground">Spread: </span>
										{game.spread}
									</span>
								</div>
							)}
							{game.overUnder && (
								<div className="flex items-center text-sm">
									<span>
										<span className="text-muted-foreground">Over/Under: </span>
										{game.overUnder}
									</span>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
			<div className="absolute -bottom-6 w-fit right-8">
				<CompactReactionSelector gameId={game.id} />
			</div>
		</div>
	);
}

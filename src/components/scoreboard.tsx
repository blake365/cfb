"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CIcon } from "@coreui/icons-react";
import { cilAmericanFootball } from "@coreui/icons";
import { useQuery } from "@tanstack/react-query";

export function Scoreboard({
	gameStart,
	gameCompleted,
	gameId,
	homeTeamId,
	awayTeamId,
}: {
	gameStart: string;
	gameCompleted: boolean;
	gameId: number;
	homeTeamId: number;
	awayTeamId: number;
}) {
	const placeholderData = {
		homeTeam: "Home Team",
		awayTeam: "Away Team",
		homeScore: 0,
		awayScore: 0,
		period: 0,
		clock: "00:00",
		possession: "home",
		lastPlay: "Last Play",
	};

	// console.log(gameStart, gameCompleted, gameId, homeTeamId, awayTeamId);
	// console.log(process.env.SERVER_URL);
	let enableQuery = false;

	const now = new Date();
	const startTime = new Date(gameStart);
	if (now > startTime && !gameCompleted) {
		enableQuery = true;
	}

	const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/scoreboard/scoreboard/hello`;
	// console.log("API URL:", apiUrl);

	const query = useQuery({
		queryKey: ["scoreboard", gameId],
		queryFn: async () => {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					homeTeam: homeTeamId,
					awayTeam: awayTeamId,
				}),
			});

			console.log("response", response);

			if (!response.ok) {
				return null;
			}

			return response.json();
		},
		enabled: enableQuery,
		placeholderData: placeholderData,
		refetchInterval: 10000,
		refetchIntervalInBackground: true,
	});

	const gameState = query.data;

	// console.log("game state", gameState);

	if (!enableQuery) {
		return null;
	}

	if (gameState === undefined || gameState?.error || gameState === null) {
		enableQuery = false;
		return null;
	}

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardContent className="p-4">
				<div className="flex flex-row justify-between gap-4 mb-2">
					<div className="text-center mx-auto flex-1">
						<p className="text-4xl font-bold">{gameState.awayTeamPoints}</p>
						{gameState.possession === "away" && (
							<CIcon icon={cilAmericanFootball} className="w-4 h-4 mx-auto" />
						)}
					</div>

					<div className="text-center flex flex-col items-center justify-center">
						<div className="mb-2">
							<p className=" font-medium">Quarter</p>
							<p className="text-xl font-bold">{gameState.period}</p>
						</div>
						<Badge variant="secondary" className="text-sm px-3 py-1">
							{gameState.clock}
						</Badge>
						<Badge
							variant="destructive"
							className="text-sm relative -top-[120px] "
						>
							LIVE-ish
						</Badge>
					</div>
					<div className="text-center mx-auto flex-1">
						<p className="text-4xl font-bold">{gameState.homeTeamPoints}</p>
						{gameState.possession === "home" && (
							<CIcon icon={cilAmericanFootball} className="w-4 h-4 mx-auto" />
						)}
					</div>
				</div>
				<div className="text-muted-foreground text-sm -mt-6">
					{gameState.lastPlay}
				</div>
			</CardContent>
		</Card>
	);
}

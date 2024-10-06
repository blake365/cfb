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

			// console.log("response", response);

			if (!response.ok) {
				return null;
			}

			return response.json();
		},
		enabled: enableQuery,
		placeholderData: placeholderData,
		refetchInterval: 10000000,
		refetchOnMount: true,
		// refetchIntervalInBackground: true,
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
			<CardContent className="">
				<div className="flex flex-col items-center justify-center">
					<div className="text-xs bg-red-500 text-white py-1 w-full text-center mb-2">
						LIVE-ish
					</div>
					<div className="flex flex-row justify-between gap-4 w-full px-8">
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
								<div className="text-sm px-3 py-1">{gameState.clock}</div>
							</div>
						</div>
						<div className="text-center mx-auto flex-1">
							<p className="text-4xl font-bold">{gameState.homeTeamPoints}</p>
							{gameState.possession === "home" && (
								<CIcon icon={cilAmericanFootball} className="w-4 h-4 mx-auto" />
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

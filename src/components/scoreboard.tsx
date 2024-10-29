"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CIcon } from "@coreui/icons-react";
import { cilAmericanFootball } from "@coreui/icons";
import { useScoreboard } from "@/hooks/useScoreboard";

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
	const {
		isGameActive,
		isError,
		homeScore,
		awayScore,
		period,
		clock,
		possession,
	} = useScoreboard({
		gameStart,
		gameCompleted,
		gameId,
		homeTeamId,
		awayTeamId,
	});

	if (!isGameActive || isError) {
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
							<p className="text-4xl font-bold">{awayScore}</p>
							{possession === "away" && (
								<CIcon icon={cilAmericanFootball} className="w-4 h-4 mx-auto" />
							)}
						</div>
						<div className="text-center flex flex-col items-center justify-center">
							<div className="mb-2">
								<p className=" font-medium">Quarter</p>
								<p className="text-xl font-bold">{period}</p>
								<div className="text-sm px-3 py-1">{clock}</div>
							</div>
						</div>
						<div className="text-center mx-auto flex-1">
							<p className="text-4xl font-bold">{homeScore}</p>
							{possession === "home" && (
								<CIcon icon={cilAmericanFootball} className="w-4 h-4 mx-auto" />
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

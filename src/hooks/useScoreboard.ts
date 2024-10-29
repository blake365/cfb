import { useQuery } from "@tanstack/react-query";

interface ScoreboardData {
	homeTeamPoints: number;
	awayTeamPoints: number;
	period: number;
	clock: string;
	possession: "home" | "away";
	lastPlay?: string;
	error?: boolean;
}

interface UseScoreboardProps {
	gameStart: string;
	gameCompleted: boolean;
	gameId: number;
	homeTeamId: number;
	awayTeamId: number;
}

export function useScoreboard({
	gameStart,
	gameCompleted,
	gameId,
	homeTeamId,
	awayTeamId,
}: UseScoreboardProps) {
	const placeholderData: ScoreboardData = {
		homeTeamPoints: 0,
		awayTeamPoints: 0,
		period: 0,
		clock: "00:00",
		possession: "home",
		lastPlay: "Last Play",
	};

	const now = new Date();
	const startTime = new Date(gameStart);
	const isGameActive =
		now > startTime &&
		!gameCompleted &&
		now.getTime() < startTime.getTime() + 1000 * 60 * 60 * 5;

	if (!isGameActive) {
		return {
			isGameActive: false,
			isError: false,
			isLoading: false,
		};
	}

	const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/scoreboard/scoreboard/hello`;

	const { data, isError, isLoading } = useQuery({
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

			if (!response.ok) {
				return null;
			}

			return response.json();
		},
		enabled: isGameActive,
		placeholderData,
		refetchInterval: 10000,
		refetchOnMount: true,
	});

	return {
		isGameActive,
		isError,
		isLoading,
		homeScore: data?.homeTeamPoints,
		awayScore: data?.awayTeamPoints,
		period: data?.period,
		clock: data?.clock,
		possession: data?.possession,
		lastPlay: data?.lastPlay,
	};
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { checkContrast, getContrastColor } from "@/lib/utils";
import { FavoriteButtonComponent } from "@/components/favorite-button";

function TeamStats({ teamData }) {
	// console.log('teamData', teamData.teamstats)
	const isContrasting = checkContrast(
		teamData.primaryColor,
		teamData.secondaryColor,
	);

	// 	console.log('isContrasting', isContrasting)
	const contrastColor = isContrasting
		? getContrastColor(teamData.primaryColor)
		: teamData.secondaryColor;

	// console.log(teamData.teamstats);

	const statsOrder = [
		"totalYards",
		"netPassingYards",
		"rushingYards",
		"passingTDs",
		"rushingTDs",
		"firstDowns",
		"tacklesForLoss",
		"sacks",
		"turnovers",
		// Add more stat keys in the desired order
	];

	return (
		<Card className="w-full max-w-5xl mx-auto m-4 overflow-hidden">
			<CardContent>
				<div
					className="flex flex-col md:flex-row"
					style={{
						backgroundColor: teamData.primaryColor,
						color: contrastColor,
					}}
				>
					<div className="p-6 md:w-1/4 flex flex-col gap-4">
						<div>
							<div className="flex justify-between items-start mb-4">
								<h1 className="text-3xl font-bold">{teamData.name}</h1>
								<FavoriteButtonComponent
									teamId={teamData.id}
									teamName={teamData.name}
									logo={teamData.logo}
									primaryColor={teamData.primaryColor}
									secondaryColor={teamData.secondaryColor}
									abbreviation={teamData.abbreviation}
								/>
							</div>
							<p className="text-xl">{teamData.mascot}</p>
						</div>
						<p className="text-xl">
							Record: {teamData.wins}-{teamData.losses}
							{teamData.ties > 0 && `-${teamData.ties}`}
						</p>
						<p className="text-xl">
							Conf: {teamData.conferenceWins}-{teamData.conferenceLosses}
							{teamData.conferenceTies > 0 && `-${teamData.conferenceTies}`}
						</p>

						<div>
							{teamData.cfpRank && (
								<p className="text-lg font-semibold">CFP: {teamData.cfpRank}</p>
							)}
							{teamData.apRank && (
								<p className="text-lg font-semibold">
									AP Rank: {teamData.apRank}
								</p>
							)}
							{teamData.coachesRank && (
								<p className="text-lg font-semibold">
									Coaches: {teamData.coachesRank}
								</p>
							)}
						</div>
						<Link
							href={`/conferences/${teamData.conference.name}`}
							className="hover:underline text-lg"
						>
							{teamData.conference.name}
						</Link>
					</div>
					<Separator orientation="vertical" className="hidden md:block" />
					{teamData.teamstats && (
						<div className="bg-white/10 p-6 md:w-3/4">
							<h2 className="text-2xl font-bold mb-4">Season Stats</h2>
							<div className="grid md:grid-cols-5 gap-4 grid-cols-3">
								{Object.entries(teamData.teamstats)
									.sort(([keyA], [keyB]) => {
										const indexA = statsOrder.indexOf(keyA);
										const indexB = statsOrder.indexOf(keyB);
										if (indexA === -1 && indexB === -1) return 0;
										if (indexA === -1) return 1;
										if (indexB === -1) return -1;
										return indexA - indexB;
									})
									.map(([key, value]) => {
										// console.log(key, value);
										if (key === "id") return;
										if (key === "teamName") return;
										if (key === "teamId") return;
										if (key === "seasonId") return;
										if (key === "conferenceId") return;
										if (value === null) return;

										// Format the key
										const formattedKey = key
											.replace(/([A-Z])/g, " $1") // Add space before capital letters
											.trim() // Remove leading/trailing spaces
											.split(" ")
											.map(
												(word) =>
													word.charAt(0).toUpperCase() +
													word.slice(1).toLowerCase(),
											)
											.join(" ")
											.replace(/T Ds/g, "TDs");

										if (formattedKey.includes("Punt")) return;
										if (formattedKey.includes("Kick")) return;
										if (formattedKey.includes("Time")) return;
										if (formattedKey.includes("Attempts")) return;
										if (formattedKey.includes("Fumbles")) return;
										if (formattedKey.includes("Intercept")) return;

										return (
											<div
												key={key}
												className="rounded p-3 flex flex-col justify-between"
												style={{
													backgroundColor: `rgba(${Number.parseInt(
														contrastColor.slice(1, 3),
														16,
													)}, ${Number.parseInt(
														contrastColor.slice(3, 5),
														16,
													)}, ${Number.parseInt(
														contrastColor.slice(5, 7),
														16,
													)}, 0.2)`, // 0.8 is the opacity
												}}
											>
												<p className="text-sm opacity-80">{formattedKey}</p>
												<p className="text-xl font-bold">
													{value && value.toLocaleString()}
												</p>
											</div>
										);
									})}
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

export default TeamStats;

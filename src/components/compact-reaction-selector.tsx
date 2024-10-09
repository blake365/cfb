"use client";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
interface CompactReactionSelectorProps {
	gameId: string;
}

import { useQuery, useMutation } from "@tanstack/react-query";

const reactions = [
	{ emoji: "🧐", name: "Curious" },
	{ emoji: "🤮", name: "Sicko" },
	{ emoji: "🤩", name: "Starry" },
	{ emoji: "🫨", name: "Panic" },
	{ emoji: "😴", name: "Snoozer" },
];

export function CompactReactionSelector({
	gameId,
	table,
	interestScore,
}: CompactReactionSelectorProps) {
	// console.log(gameId)

	const query = useQuery({
		queryKey: ["interactions", gameId],
		queryFn: async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/games/${Number.parseInt(gameId)}/interactions`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch interactions");
			}
			return response.json();
		},
		placeholderData: [],
	});

	// console.log(query.data)
	const interactions = query.data;

	// console.log(interactions)

	const reactionCounts = {
		"🧐": interactions.filter(
			(interaction) => interaction.interactionType === "Curious",
		).length,
		"🤮": interactions.filter(
			(interaction) => interaction.interactionType === "Sicko",
		).length,
		"🤩": interactions.filter(
			(interaction) => interaction.interactionType === "Starry",
		).length,
		"🫨": interactions.filter(
			(interaction) => interaction.interactionType === "Panic",
		).length,
		"😴": interactions.filter(
			(interaction) => interaction.interactionType === "Snoozer",
		).length,
	};

	const mutation = useMutation({
		mutationFn: async ({ emoji, name }: { emoji: string; name: string }) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/interactions/${gameId}`,
				{
					method: "POST",
					credentials: "include",
					body: JSON.stringify({
						interactionType: name,
					}),
				},
			);
			if (!response.ok) {
				throw new Error("Failed to add reaction");
			}
		},
		onSuccess: (data, variables, context) => {
			// console.log(data, variables, context);
			query.refetch();
		},
		onError: (error, variables, context) => {
			console.log(error, variables, context);
		},
	});

	function handleReaction(emoji: string, name: string) {
		mutation.mutate({ emoji: emoji, name: name });
	}

	let overallClasses =
		"inline-flex items-center space-x-1 rounded-xl pt-2 pb-1 py-1 relative z-10 border border-slate-700 bg-slate-300 dark:bg-slate-900 shadow-md";
	let spanClasses =
		"absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center";
	let emojiSize = "text-3xl";
	if (table) {
		overallClasses =
			"w-full inline-flex items-center space-x-6 pl-4 pt-2 py-1 sticky left-0";
		spanClasses =
			"absolute -top-2 -right-3 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center";
		emojiSize = "text-2xl";
	}

	return (
		<TooltipProvider>
			<div className={overallClasses}>
				{reactions.map(({ emoji, name }) => (
					<Tooltip key={emoji}>
						<TooltipTrigger asChild>
							<Button
								variant="none"
								size={table ? "xs" : "sm"}
								className="px-1 rounded-full relative hover:scale-150 transition-all duration-200"
								onClick={() => handleReaction(emoji, name)}
							>
								<span className={emojiSize}>{emoji}</span>
								{reactionCounts[emoji] > 0 && (
									<span className={spanClasses}>{reactionCounts[emoji]}</span>
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>{name}</p>
						</TooltipContent>
					</Tooltip>
				))}
				{table && (
					<div className="text-xs text-muted-foreground">
						Interest Score: {interestScore}
					</div>
				)}
			</div>
		</TooltipProvider>
	);
}

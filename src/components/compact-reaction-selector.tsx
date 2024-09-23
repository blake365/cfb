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
	{ emoji: "👀", name: "Curious" },
	{ emoji: "🤮", name: "Sicko" },
	{ emoji: "🔥", name: "Hot" },
	{ emoji: "🚨", name: "Upset Alert" },
	{ emoji: "😴", name: "Snoozer" },
];

export function CompactReactionSelector({
	gameId,
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
		"👀": interactions.filter(
			(interaction) => interaction.interactionType === "Curious",
		).length,
		"🤮": interactions.filter(
			(interaction) => interaction.interactionType === "Sicko",
		).length,
		"🔥": interactions.filter(
			(interaction) => interaction.interactionType === "Hot",
		).length,
		"🚨": interactions.filter(
			(interaction) => interaction.interactionType === "Upset Alert",
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
			console.log(data, variables, context);
			query.refetch();
		},
		onError: (error, variables, context) => {
			console.log(error, variables, context);
		},
	});

	function handleReaction(emoji: string, name: string) {
		mutation.mutate({ emoji: emoji, name: name });
	}

	return (
		<TooltipProvider>
			<div className="inline-flex items-center space-x-1 rounded-xl pt-2 pb-1 py-1 relative z-10 border border-slate-700 bg-slate-300 dark:bg-slate-900 shadow-md">
				{reactions.map(({ emoji, name }) => (
					<Tooltip key={emoji}>
						<TooltipTrigger asChild>
							<Button
								variant="none"
								size="sm"
								className="px-2 rounded-full relative hover:scale-150 transition-all duration-200"
								onClick={() => handleReaction(emoji, name)}
							>
								<span className="text-2xl">{emoji}</span>
								{reactionCounts[emoji] > 0 && (
									<span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
										{reactionCounts[emoji]}
									</span>
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>{name}</p>
						</TooltipContent>
					</Tooltip>
				))}
			</div>
		</TooltipProvider>
	);
}

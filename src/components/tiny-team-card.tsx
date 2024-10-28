import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export function TinyTeamCard({
	team,
	size,
	withWins,
}: {
	team: any;
	size: number;
	withWins: boolean;
}) {
	// console.log(size)
	return (
		<Link
			href={`/teams/${team.name}`}
			prefetch={false}
			className="flex flex-col items-center"
		>
			<Avatar
				className={`h-${size} w-${size} font-bold shadow-md ${
					size <= 20 ? "text-xs" : ""
				} hover:border-primary border border-muted-foreground overflow-hidden hover:shadow-md hover:bg-muted`}
			>
				<AvatarImage src={team.logo} alt={`${team.name} logo`} />
				<AvatarFallback
					style={{
						// backgroundColor: team.primaryColor,
						color: team.primaryColor,
					}}
				>
					{team.abbreviation}
				</AvatarFallback>
			</Avatar>
			{withWins && (
				<div className="flex flex-col items-center p-1">
					<p className="text-xs">
						Record: {team.wins} - {team.losses}
					</p>
					<p className="text-xs">
						Conf: {team.conferenceWins} - {team.conferenceLosses}
					</p>
				</div>
			)}
		</Link>
	);
}

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export function TinyTeamCard({ team, size }: { team: any; size: number }) {
	// console.log(size)
	return (
		<Link href={`/teams/${team.name}`} prefetch={false}>
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
		</Link>
	);
}

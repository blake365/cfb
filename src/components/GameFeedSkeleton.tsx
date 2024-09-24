import { Skeleton } from "@/components/ui/skeleton";

export default function GameFeedSkeleton() {
	return (
		<div className="max-w-2xl space-y-4">
			<Skeleton className="h-24 w-full bg-muted" />
			<Skeleton className="h-24 w-full bg-muted" />
			<Skeleton className="h-24 w-full bg-muted" />
		</div>
	);
}

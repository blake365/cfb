"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function GameFeedSkeleton() {
	return (
		<div className="flex flex-col items-center mb-10 gap-4 w-[700px] max-w-2xl mt-4">
			<Skeleton className="h-[60px] w-full" />
			<div className="flex flex-col items-center mb-10 gap-4 w-full">
				<Skeleton className="h-[170px] w-full" />
				<Skeleton className="h-[170px] w-full" />
				<Skeleton className="h-[170px] w-full" />
			</div>
		</div>
	);
}

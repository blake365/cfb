import { Suspense } from "react";
import GameFeed from "@/components/GameFeed";
import GameFeedSkeleton from "@/components/GameFeedSkeleton";

export default async function Page({ params }: { params: { number: string } }) {
	// console.log(params.number)
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/week/${params.number}`,
		{ next: { revalidate: 900 } },
	);
	const games = await data.json();

	// console.log(teamData)

	return (
		<main className="flex flex-col items-center min-h-screen mx-4">
			<div className="flex flex-col items-center mb-10">
				<Suspense fallback={<GameFeedSkeleton />}>
					<GameFeed
						initialGames={games}
						week={{ week: Number(params.number) }}
					/>
				</Suspense>
			</div>
		</main>
	);
}

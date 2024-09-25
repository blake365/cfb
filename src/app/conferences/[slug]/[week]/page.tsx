import { Suspense } from "react";
import GameFeedSkeleton from "@/components/GameFeedSkeleton";
import GameFeed from "@/components/GameFeed";

export default async function Page({
	params,
}: {
	params: { slug: string; week: string };
}) {
	// console.log(params.slug);
	// console.log(params.week);

	const games = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/conference/${params.slug}/${params.week}`,
		{ next: { revalidate: 900 } },
	);
	const gamesData = await games.json();
	// console.log(gamesData)

	// console.log(teamData)
	return (
		<main className="flex flex-col items-center min-h-screen mx-4">
			<div className="flex flex-col w-full items-center mb-10">
				<Suspense fallback={<GameFeedSkeleton />}>
					<GameFeed
						initialGames={gamesData}
						week={{ week: Number.parseInt(params.week) }}
						nested={`conferences/${params.slug}`}
					/>
				</Suspense>
			</div>
		</main>
	);
}

import { Suspense } from "react";
import GameFeedSkeleton from "@/components/GameFeedSkeleton";
import GameFeed from "@/components/GameFeed";
import weeks from "@/lib/weeks";

export default async function Page({ params }: { params: { slug: string } }) {
	// console.log(params.slug)
	const now = new Date().getTime();
	const currentWeek = weeks.find((week) => {
		return now >= week.startDate.getTime() && now <= week.endDate.getTime();
	});

	const games = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/games/conference/${params.slug}/${currentWeek.week}`,
		{ next: { revalidate: 900 } },
	);
	const gamesData = await games.json();
	// console.log(gamesData)

	return (
		<main className="flex flex-col items-center min-h-screen mx-4">
			<div className="flex flex-col w-full items-center mb-10">
				<Suspense fallback={<GameFeedSkeleton />}>
					<GameFeed
						initialGames={gamesData}
						week={currentWeek}
						nested={`conferences/${params.slug}`}
					/>
				</Suspense>
			</div>
		</main>
	);
}

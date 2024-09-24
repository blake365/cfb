"use client";

import Link from "next/link";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import weeks from "@/lib/weeks";
import { Button } from "./ui/button";
import { SortAsc, SortDesc } from "lucide-react";

function WeekHeader({
	week,
	nested,
	sortKey,
	sortOrder,
	onSort,
}: {
	week: any;
	nested?: string;
	sortKey: string;
	sortOrder: string;
	onSort: (key: string) => void;
}) {
	const now = new Date().getTime();
	let currentWeek = week;
	if (!week) {
		currentWeek = weeks.find((week) => {
			return now >= week.startDate.getTime() && now <= week.endDate.getTime();
		});
	}

	const link = nested ? `/${nested}/` : "/week/";

	return (
		<>
			<div className="md:grid md:grid-cols-3 flex flex-row w-full justify-between max-w-2xl pb-4 pt-4 sticky top-0 bg-background/80 z-20">
				<Link
					className="ml-4 text-primary font-bold flex items-center gap-2"
					href={`${link}${currentWeek.week === 0 ? 0 : currentWeek.week - 1}`}
				>
					<ArrowBigLeft className="fill-current hover:scale-125" />
				</Link>
				<div className="text-primary text-2xl font-bold flex items-center md:justify-center">
					Week {currentWeek?.week}
				</div>
				<div className="flex flex-row justify-end">
					<Button
						onClick={() =>
							onSort(sortKey === "gameStart" ? "interestScore" : "gameStart")
						}
						className="border-r-2 px-2"
						aria-label={`Switch to ${sortKey === "gameStart" ? "interestScore" : "gameStart"} sorting`}
					>
						{sortKey === "gameStart" ? "Sort by Interest" : "Sort by Date"}
					</Button>
					<Button
						className="px-2"
						onClick={() => onSort(sortKey)}
						aria-label={`Change sort direction to ${sortOrder === "asc" ? "desc" : "asc"}`}
					>
						{sortOrder === "asc" ? (
							<SortDesc className="h-4 w-4" />
						) : (
							<SortAsc className="h-4 w-4" />
						)}
					</Button>
					<Link
						className=" mr-4 text-primary font-bold flex items-center gap-2 hover:scale-125"
						href={`${link}${
							currentWeek.week > weeks.length
								? weeks.length
								: currentWeek.week + 1
						}`}
					>
						<ArrowBigRight className="fill-current" />
					</Link>
				</div>
			</div>
		</>
	);
}

export default WeekHeader;

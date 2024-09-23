import { ConferenceCard } from "@/components/conference-card";

async function ConferenceList() {
	const conference = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/conferences`,
	);
	const conferenceData = await conference.json();

	return (
		<div className="flex flex-row flex-wrap w-full gap-4 items-start mb-10 justify-center mx-auto">
			{conferenceData.map((conference) => (
				<ConferenceCard key={conference.id} conference={conference} />
			))}
		</div>
	);
}

export default ConferenceList;

"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
interface AvatarData {
	id: number;
	logo: string;
	name: string;
	abbreviation: string;
	primaryColor: string;
	secondaryColor: string;
}

interface AvatarGroupProps {
	avatars?: AvatarData[];
	maxAvatars?: number;
	spread?: boolean;
}

export function AvatarGroupComponent({
	avatars = [],
	maxAvatars = 5,
}: AvatarGroupProps) {
	const displayAvatars = Array.isArray(avatars)
		? avatars.slice(0, maxAvatars)
		: [];

	return (
		<div className="overflow-x-auto max-w-[calc(100vw-10rem)]">
			<div className="flex items-center">
				<div className="flex -space-x-4 sm:hover:space-x-2 hover:space-x-0 transition-all duration-300 ease-in-out">
					{displayAvatars.map((avatar) => (
						<Link href={`/teams/${avatar.name}`} key={avatar.id} className="">
							<Avatar className="w-10 h-10 border border-background hover:z-10 bg-background hover:border-primary shadow-md">
								<AvatarImage src={avatar.logo} alt={avatar.name} />
								{/* <AvatarFallback
									style={{
										backgroundColor: avatar.primaryColor,
										color: avatar.secondaryColor,
									}}
								>
									{avatar.abbreviation}
								</AvatarFallback> */}
							</Avatar>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

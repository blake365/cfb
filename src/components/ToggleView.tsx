"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, GalleryVertical } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export function ToggleView() {
	const [isTable, setIsTable] = useState(false);
	const queryClient = useQueryClient();

	useEffect(() => {
		const view = JSON.parse(localStorage.getItem("view"));
		setIsTable(view === "table");
	}, []);

	const toggleView = () => {
		let view = JSON.parse(localStorage.getItem("view"));

		if (isTable) {
			view = "feed";
		} else {
			view = "table";
		}

		localStorage.setItem("view", JSON.stringify(view));
		setIsTable(!isTable);

		queryClient.invalidateQueries({ queryKey: ["view"] });
	};

	return (
		<Button
			variant="none"
			size="icon"
			onClick={toggleView}
			aria-label={isTable ? "Switch to feed view" : "Switch to table view"}
		>
			{isTable ? (
				<GalleryVertical className="w-8 h-8 hover:text-primary" />
			) : (
				<Table className="w-8 h-8 hover:text-primary" />
			)}
		</Button>
	);
}

import { Button } from "@/components/ui/button";
import { Menu, House } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ResponsiveComboBox } from "@/components/ResponsiveCombobox";
import FavoriteTeams from "@/components/FavoriteTeams";

export default function TopNavBar() {
	return (
		<nav className="bg-muted">
			<div className="container mx-auto px-4 py-2">
				<div className="flex items-center justify-between">
					<Link href="/" className="text-xl font-bold sm:text-2xl">
						<House className="w-9 h-9 hover:fill-current" />
					</Link>

					{/* Desktop search */}
					<div className="hidden sm:flex items-center space-x-2">
						<FavoriteTeams />
						<ResponsiveComboBox label="Find A Team" />
						<Link href="/conferences" className="hover:underline shadow-md">
							<Button variant="outline">Conferences</Button>
						</Link>
					</div>

					{/* Mobile menu and search */}
					<div className="flex items-center space-x-2 sm:hidden">
						<div className="w-full overflow-x-scroll">
							<FavoriteTeams />
						</div>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Menu className="h-5 w-5" />
									<span className="sr-only">Open menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right">
								<SheetHeader>
									<SheetTitle>Menu</SheetTitle>
								</SheetHeader>
								<div className="mt-4 space-y-4">
									<ResponsiveComboBox label="Find A Team" />
									<SheetClose asChild>
										<Link href="/conferences" className="mt-4">
											<Button
												variant="outline"
												className="w-full justify-center mt-4 shadow-md"
											>
												Conferences
											</Button>
										</Link>
									</SheetClose>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</nav>
	);
}

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
import { ToggleView } from "./ToggleView";

export default function TopNavBar() {
	return (
		<nav className="bg-muted">
			<div className="container">
				<div className="flex items-center justify-between h-[64px]">
					<div className="flex items-center space-x-2">
						<Link href="/" className="text-xl font-bold sm:text-2xl">
							<House className="w-8 h-8 hover:text-primary" />
						</Link>
						<ToggleView />
					</div>
					{/* Desktop search */}
					<div className="hidden sm:flex items-center space-x-2">
						<FavoriteTeams />
						<ResponsiveComboBox label="Find A Team" />
						<Link href="/conferences" className="hover:underline shadow-md">
							<Button>Conferences</Button>
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
									<Menu className="h-8 w-8" />
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
											<Button className="w-full justify-center mt-4 shadow-md">
												All Conferences
											</Button>
										</Link>
									</SheetClose>
									<SheetClose asChild>
										<Link href="/conferences/ACC" className="mt-4">
											<Button className="w-full justify-center mt-4 shadow-md">
												ACC
											</Button>
										</Link>
									</SheetClose>
									<SheetClose asChild>
										<Link href="/conferences/Big%2012" className="mt-4">
											<Button className="w-full justify-center mt-4 shadow-md">
												Big 12
											</Button>
										</Link>
									</SheetClose>
									<SheetClose asChild>
										<Link href="/conferences/Big%20Ten" className="mt-4">
											<Button className="w-full justify-center mt-4 shadow-md">
												Big Ten
											</Button>
										</Link>
									</SheetClose>
									<SheetClose asChild>
										<Link href="/conferences/SEC" className="mt-4">
											<Button className="w-full justify-center mt-4 shadow-md">
												SEC
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

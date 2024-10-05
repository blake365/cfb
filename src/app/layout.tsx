import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider, ThemeProvider } from "./providers";
import TopNavBar from "@/components/TopNavBar";
import { ReturnToTopButton } from "@/components/return-to-top-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "College Football Sickos",
	description:
		"Your destination for which college football games to watch each week. Check schedules, scores, and rate match ups.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 16 16'><text x='0' y='14'>🤮</text></svg>"
				/>
			</head>
			<body className={inter.className}>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						// disableTransitionOnChange
					>
						<TopNavBar />
						{children}
						<ReturnToTopButton />
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}

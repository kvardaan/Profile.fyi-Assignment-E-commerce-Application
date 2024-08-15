import type { Metadata } from "next";

import { Footer } from "@/components/app/footer";
import { AppBar } from "@/components/app/app-bar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<AppBar />
			<div className="flex-grow">{children}</div>
			<Footer />
		</div>
	);
}

import type { Metadata } from "next";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { inter } from "@/lib/fonts";
import { CartProvider } from "@/store/context";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
	title: "E-Commerce Application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={cn(inter.className, "flex flex-col	min-h-screen antialiased")}>
					<CartProvider>
						{children}
						<Toaster richColors position="top-center" closeButton />
					</CartProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}

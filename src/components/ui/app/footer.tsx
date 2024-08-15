"use client";

import Link from "next/link";
import { Store } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bottom-0">
			<div className="gap-x-3 py-4 md:py-6 border-t text-gray-600 flex justify-center items-center">
				<Link href="/" className="flex items-center justify-center gap-x-3">
					<Store className="h-5 w-5 md:h-6 md:w-6" />
					<p className="font-medium md:font-semibold text-md md:text-xl">E-commerce Application</p>
				</Link>
			</div>
		</footer>
	);
};

export { Footer };

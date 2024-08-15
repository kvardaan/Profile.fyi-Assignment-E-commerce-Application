"use client";

import Link from "next/link";
import { Menu, ShoppingCart, Store } from "lucide-react";

import { Button } from "@/components/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useContext } from "react";
import { CartContext } from "@/storecontext";

const AppBar = () => {
	const context = useContext(CartContext);
	const { cartTotalItems } = context!;
	return (
		<header>
			<div className="top-0 flex justify-between items-center border-b p-4 md:py-6">
				<Link href="/" className="border rounded-lg p-2 text-gray-600">
					<Store className="h-6 w-6" />
				</Link>
				<div className="flex flex-row gap-x-3 items-center justify-between md:flex-row">
					<Menu className="block md:hidden" />
					<div className="hidden md:block items-center">
						<div className="flex flex-row gap-x-3 items-center justify-between">
							<SignedOut>
								<Button variant="outline" className="text-base">
									<SignInButton />
								</Button>
								<Button className="text-base">
									<SignUpButton />
								</Button>
							</SignedOut>
							<SignedIn>
								<Link href="/cart" className="relative flex items-center justify-center gap-x-2">
									<span className="relative">
										<ShoppingCart className="text-gray-600" />
										{cartTotalItems > 0 && (
											<span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-sky-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
												{cartTotalItems}
											</span>
										)}
									</span>
								</Link>

								<UserButton
									showName
									appearance={{
										elements: {
											userButtonAvatarBox: "size-10 border border-gray-200",
											userButtonOuterIdentifier: "text-sm md:text-base text-gray-600",
										},
									}}
								/>
							</SignedIn>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export { AppBar };

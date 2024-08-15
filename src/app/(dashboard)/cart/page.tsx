"use client";

import { toast } from "sonner";
import { useContext } from "react";

import { promise } from "@/lib/utils";
import { Button } from "@/components/button";
import { CartContext } from "@/storecontext";
import { CartProduct } from "@/components/app/cart-product";

import { Discount } from "@/components/app/discount";

export default function Home() {
	const context = useContext(CartContext);
	const { cart } = context!;

	const handleProductBuy = () =>
		toast.promise(promise, {
			loading: "Loading...",
			success: () => {
				return `Order placed!`;
			},
			error: "Error placing order! Try again!",
		});

	return (
		<main className="bg-gray-100">
			<div className="flex flex-col md:flex-row gap-2 p-4">
				<div className="w-full border rounded-md bg-white p-3">
					<h2 className="text-xl md:text-3xl my-2">Shopping Cart</h2>
					{cart.length ? (
						cart.map((product: any) => <CartProduct key={product.id} product={product} />)
					) : (
						<p className="md:py-3 text-gray-500">Your cart is empty.</p>
					)}
				</div>
				{cart.length ? (
					<div className="w-full flex flex-col justify-start gap-y-4 md:w-1/4 border rounded-md p-3 bg-white text-xs md:text-lg">
						<p className="my-2 text-lg md:text-2xl border-b pb-3">Checkout</p>
						<Discount />
						<Button size="lg" className="bg-blue-500 hover:bg-blue-700" onClick={handleProductBuy}>
							Proceed to buy
						</Button>
					</div>
				) : null}
			</div>
		</main>
	);
}

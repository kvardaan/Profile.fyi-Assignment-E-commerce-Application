"use client";

import { useContext } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { CartContext } from "@/storecontext";
import { Button } from "@/components/button";
import { Card, CardContent, CardHeader } from "@/components/card";
import { toast } from "sonner";

export interface Product {
	product: {
		id: string;
		name: string;
		price: number;
		imageSrc: string;
		quantity?: number;
	};
}

const ProductCard = ({ product }: Product) => {
	const context = useContext(CartContext);
	const { addToCart } = context!;
	const { userId } = useAuth();
	const router = useRouter();

	return (
		<Card className="flex flex-col items-center text-sm">
			<CardHeader>
				<img
					src={product.imageSrc}
					alt={product.name}
					className="rounded-md w-40 h-48 hover:scale-110 transition duration-300"
				/>
			</CardHeader>
			<CardContent className="flex flex-col gap-y-3">
				<p className="truncate max-w-80 md:max-w-56">{product.name}</p>
				<p className="font-medium">₹{product.price / 100}</p>
				<Button
					size="sm"
					className="bg-blue-500 hover:bg-blue-700"
					onClick={() => {
						if (!userId) return toast.error("Login to add items to the cart!");
						addToCart({ product, quantity: 1 });
					}}
				>
					Add to cart
				</Button>
			</CardContent>
		</Card>
	);
};

export { ProductCard };

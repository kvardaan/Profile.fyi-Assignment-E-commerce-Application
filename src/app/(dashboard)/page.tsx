"use client";

import { useContext } from "react";

import { cn } from "@/lib/utils";
import { lusitana } from "@/lib/fonts";
import { Product } from "@/lib/schemas/context";
import { CartContext } from "@/store/context";
import { ProductCard } from "@/components/app/product-card";

export default function Home() {
	const context = useContext(CartContext);
	const { products } = context!;

	return (
		<section className="p-4">
			<h1 className={cn(lusitana.className, "font-semibold text-xl md:text-3xl text-center lg:text-left py-4")}>
				E-Commerce Application
			</h1>
			<div>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
					{products.map((product: Product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</section>
	);
}

"use client";

import { Trash2 } from "lucide-react";
import { useContext, useState } from "react";

import { CartContext } from "@/storecontext";
import { Button } from "@/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";

interface CartProductProps {
	product: {
		id: string;
		name: string;
		imageSrc: string;
		price: number;
		quantity: number;
	};
}

const CartProduct = ({ product }: CartProductProps) => {
	const [selectedQuantity, setSelectedQuantity] = useState<number>(product.quantity);
	const context = useContext(CartContext);
	const { removeFromCart, updateQuantity } = context!;

	const handleQuantityChange = (value: string) => {
		const newQuantity = Number(value);

		if (newQuantity === 0) {
			removeFromCart(product.id);
		} else {
			setSelectedQuantity(newQuantity);
			updateQuantity(product.id, newQuantity);
		}
	};

	return (
		<div className="border-y py-2 md:py-4 flex flex-row text-xs md:text-lg tracking-tight text-wrap gap-x-3">
			{/* Image */}
			<img
				src={product.imageSrc}
				alt={`${product.name}'s Image`}
				className="w-20 h-24 md:w-32 md:h-36 my-auto p-0 rounded-lg"
			/>
			{/* Details */}
			<div className="flex flex-col justify-between gap-y-3">
				<p>{product.name}</p>
				<p className="font-semibold">₹{(product.price / 100) * selectedQuantity}</p>
				<div className="flex flex-row gap-x-3 items-center justify-between text-gray-400">
					<div className="flex flex-row items-center gap-x-3">
						Qty:
						<Select onValueChange={handleQuantityChange}>
							<SelectTrigger className="h-10 min-w-fit">
								<SelectValue placeholder={`${selectedQuantity}`} />
							</SelectTrigger>
							<SelectContent className="w-16 items-start">
								{Array.from({ length: 11 }, (_, index) => (
									<SelectItem key={index} value={`${index}`}>
										{index} {index === 0 ? "(Delete)" : ""}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Button
							variant="ghost"
							size="sm"
							className="p-0 hover:bg-transparent hover:text-red-500"
							onClick={() => removeFromCart(product.id)}
						>
							<Trash2 className="w-5 h-5 md:h-7 md:w-7" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { CartProduct };

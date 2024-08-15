"use client";

import { toast } from "sonner";
import { useContext, useState } from "react";

import { Input } from "@/components/input";
import { discountCodes } from "@/lib/utils";
import { Button } from "@/components/button";
import { CartContext } from "@/storecontext";

const Discount = () => {
	const context = useContext(CartContext);
	const [discountCode, setDiscountCode] = useState("");
	const { cartTotal, discount, finalPrice, appliedCode, applyDiscount } = context!;

	const handleApplyDiscount = () => {
		if (!discountCodes.includes(discountCode)) toast.error("Invalid discount code!");
		applyDiscount(discountCode);
	};

	return (
		<>
			<div className="flex flex-col text-md">
				<p className="font-medium flex justify-between">
					Total: <span>₹{cartTotal / 100}</span>
				</p>
				{discount > 0 && (
					<>
						<p className="font-medium flex justify-between text-green-600">
							Discount: <span>- ₹{discount / 100}</span>
						</p>
						<p className="font-medium flex justify-between text-blue-600">
							Applied Code: <span>{appliedCode}</span>
						</p>
					</>
				)}
				<p className="font-medium flex justify-between">
					Final Price:{" "}
					<span className="flex flex-row items-center gap-x-2">
						{discount > 0 && <span className="line-through	font-normal">₹{cartTotal / 100}</span>}
						<span className="text-green-600">₹{finalPrice / 100}</span>
					</span>
				</p>
			</div>
			<div className="flex flex-col gap-y-2">
				<Input
					type="text"
					placeholder="Discount Code"
					value={discountCode}
					onChange={(e) => setDiscountCode(e.target.value)}
				/>
				<Button type="button" onClick={handleApplyDiscount}>
					Apply Discount
				</Button>
			</div>
		</>
	);
};

export { Discount };

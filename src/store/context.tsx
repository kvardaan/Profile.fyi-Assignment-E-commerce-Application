"use client";

import { toast } from "sonner";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

import { AddToCart, CartContextType, CartItem, Product } from "@/lib/schemas/context";
import { discountCodes } from "@/lib/utils";

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<CartItem[]>([]);
	const [discount, setDiscount] = useState<number>(0);
	const [cartTotal, setCartTotal] = useState<number>(0);
	const [cartTotalItems, setCartTotalItems] = useState<number>(0);
	const [appliedCode, setAppliedCode] = useState<string>("");

	const fetchProducts = async () => {
		try {
			const response = await axios({ method: "get", url: "/api/products" });

			setProducts(response.data);
		} catch (error) {
			console.error("Error fetching products:", error);
			toast.error("Error fetching products. Please try again later.");
		}
	};

	const fetchCart = async () => {
		try {
			const response = await axios({ method: "get", url: "/api/cart" });

			setCart(response.data);
		} catch (error) {
			console.error("Error fetching cart:", error);
			toast.error("Error fetching cart. Please try again later.");
		}
	};

	const addToCart = async ({ product, quantity }: AddToCart) => {
		try {
			const response = await axios({
				method: "post",
				url: "/api/cart",
				data: {
					productId: product.id,
					quantity,
				},
			});

			const updatedCart = response.data;
			setCart(updatedCart);

			toast.success(`Added ${product.name} to the cart!`);
		} catch (error) {
			console.error("Error adding to cart:", error);
			toast.error("Error adding to the cart! Please try again later!");
		}
	};

	const removeFromCart = async (productId: string) => {
		try {
			const response = await axios({
				method: "delete",
				url: `/api/cart/${productId}`,
			});

			if (response.status === 200) {
				setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
				toast.success(`Product removed from the cart!`);
			}
		} catch (error) {
			toast.error("Error removing from the cart! Please try again later!");
		}
	};

	const updateQuantity = async (productId: string, quantity: number) => {
		try {
			const response = await axios({
				method: "put",
				url: `/api/cart/${productId}`,
				data: { quantity },
			});

			if (response.status === 200) {
				setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)));
			}
		} catch (error) {
			toast.error("Error updating the quantity of the item! Try again!");
		}
	};

	const fetchCartTotal = async () => {
		try {
			const response = await axios({ method: "get", url: "/api/cart/total" });

			setCartTotal(response.data.total);
			setCartTotalItems(response.data.totalItems);
		} catch (error) {
			console.error("Error fetching cart:", error);
			toast.error("Error fetching cart. Please try again later.");
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		fetchCart();
	}, []);

	useEffect(() => {
		fetchCartTotal();
	}, [cart]);

	const applyDiscount = (discountCode: string) => {
		if (!discountCodes.includes(discountCode)) {
			setDiscount(0);
			setAppliedCode("");
		}

		setAppliedCode(discountCode);
	};

	const finalPrice = cartTotal - discount;
	useEffect(() => {
		applyDiscount(appliedCode);
		finalPrice;
	}, [cart, appliedCode, finalPrice]);

	useEffect(() => {
		let discountValue = 0;

		if (appliedCode === "SAVE10") {
			discountValue = 1000; // Fixed 10.00 off
		} else if (appliedCode === "FLAT20") {
			discountValue = cartTotal * 0.2; // 20% off
		}

		setDiscount(discountValue);
	}, [cartTotal, appliedCode]);

	return (
		<CartContext.Provider
			value={{
				products,
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				cartTotal,
				cartTotalItems,
				discount,
				applyDiscount,
				finalPrice,
				appliedCode,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

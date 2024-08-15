export interface Product {
	id: string;
	name: string;
	price: number;
	imageSrc: string;
	quantity?: number;
}

export interface CartItem {
	id: string;
	name: string;
	price: number;
	imageSrc: string;
	quantity: number;
}

export interface AddToCart {
	product: Product;
	quantity: number;
}

export interface CartContextType {
	cart: CartItem[];
	products: Product[];
	addToCart: (props: AddToCart) => void;
	removeFromCart: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	cartTotal: number;
	cartTotalItems: number;
	discount: number;
	applyDiscount: (discountCode: string) => void;
	finalPrice: number;
	appliedCode: string;
}

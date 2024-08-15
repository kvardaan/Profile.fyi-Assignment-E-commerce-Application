import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
	const { userId } = auth();

	if (!userId) {
		return;
	}

	const user = await prisma.user.findUnique({
		where: { externalId: userId as string },
		include: { cart: true },
	});

	const cart = await prisma.cart.findFirst({
		where: { userId: user?.id },
		include: {
			items: {
				include: { product: true },
			},
		},
	});

	if (!cart) {
		return NextResponse.json([]);
	}

	const cartItems = cart.items.map((item) => ({
		...item.product,
		quantity: item.quantity,
	}));

	return NextResponse.json(cartItems, { status: 200 });
}

export async function POST(request: Request) {
	const { userId } = auth();
	const body = await request.json();
	const { productId, quantity } = body;

	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const user = await prisma.user.findUnique({
		where: { externalId: userId as string },
		include: { cart: true },
	});

	const existingItem = await prisma.cartItem.findFirst({
		where: { cartId: user?.cart?.id, productId, quantity },
	});

	if (existingItem) {
		await prisma.cartItem.update({
			where: { id: existingItem.id },
			data: { quantity: existingItem.quantity + quantity },
		});
	} else {
		await prisma.cartItem.create({
			data: {
				cartId: user?.cart?.id as string,
				productId,
				quantity,
			},
		});
	}

	const updatedCart = await prisma.cart.findUnique({
		where: { id: user?.cart?.id },
		include: {
			items: {
				include: { product: true },
			},
		},
	});

	const cartItems = updatedCart?.items.map((item) => ({
		...item.product,
		quantity: item.quantity,
	}));

	return NextResponse.json(cartItems);
}

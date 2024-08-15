import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

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
		return NextResponse.json({ total: 0, totalItems: 0 });
	}

	const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
	const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

	return NextResponse.json({ total, totalItems });
}

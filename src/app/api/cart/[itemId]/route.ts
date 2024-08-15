import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { itemId: string } }) {
	const body = await request.json();
	const { quantity } = body;
	const { itemId } = params;

	const updatedItem = await prisma.cartItem.update({
		where: { productId: itemId },
		data: { quantity },
		include: { product: true },
	});

	return NextResponse.json({
		...updatedItem.product,
		quantity: updatedItem.quantity,
	});
}

export async function DELETE(request: Request, { params }: { params: { itemId: string } }) {
	const { itemId } = params;

	await prisma.cartItem.delete({
		where: {
			productId: itemId,
		},
	});

	return NextResponse.json({ message: "Item removed from cart" });
}

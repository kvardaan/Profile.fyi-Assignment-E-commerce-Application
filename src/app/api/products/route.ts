import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
	const products = await prisma.product.findMany();
	return NextResponse.json(products, { status: 200 });
}

export async function POST(request: Request) {
	const body = await request.json();
	const { name, price, imageSrc } = body;

	const product = await prisma.product.create({
		data: { name, price, imageSrc },
	});

	return NextResponse.json(product);
}

import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// GET /api/users/:id - gets a user with ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const user = await prisma?.user.findUnique({
			where: { id: params.id },
			include: { cart: true },
		});

		if (!user) {
			return new NextResponse(JSON.stringify({ message: "User not found!" }), { status: 404 });
		}

		return new NextResponse(JSON.stringify(user), { status: 200 });
	} catch (error) {
		console.error("Error fetching user:", error);
		return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
		});
	}
}

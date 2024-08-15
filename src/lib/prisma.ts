import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
	if (params.model === "User" && params.action === "create") {
		const result = await next(params);

		// Automatically create a cart for the new user
		await prisma.cart.create({
			data: {
				userId: result.id,
			},
		});

		return result;
	}
	return next(params);
});

export default prisma;

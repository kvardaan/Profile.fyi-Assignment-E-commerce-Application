import { headers } from "next/headers";
import { Webhook } from "svix";

import prisma from "@/lib/prisma";
import { Event } from "@/lib/schemas/webhook";
import { NextResponse } from "next/server";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	// Get the body
	const payload = await request.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(webhookSecret);

	let evt: Event;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as any;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occured", {
			status: 400,
		});
	}

	const eventType: string = evt.type;

	if (eventType === "user.created") {
		const { id } = evt.data;
		const emailAddresses = evt.data.email_addresses;
		const email_address = emailAddresses.length > 0 ? emailAddresses[0].email_address : "";

		const response = await prisma.user.create({
			data: {
				name: `${evt.data.first_name} ${evt.data.last_name}`,
				email: email_address,
				externalId: id as string,
			},
		});

		return NextResponse.json(response);
	}
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;

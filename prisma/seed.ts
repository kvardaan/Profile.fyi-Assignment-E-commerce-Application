import prisma from "../src/lib/prisma";

async function main() {
	// Create products
	const products = await prisma.product.createMany({
		data: [
			{
				name: `Boult Drift BT Calling 1.69" HD Display, 140+ Watchfaces, 475Nits Brightness, IP67 Smartwatch  (Black Strap, Free Size)`,
				price: 129900, // 1299.00
				imageSrc:
					"https://rukminim2.flixcart.com/image/128/128/xif0q/smartwatch/o/l/h/-original-imagghz3bxh5cmab.jpeg?q=70&crop=false",
			},
			{
				name: `Noise Icon 4 with Stunning 1.96" AMOLED Display, Metallic Finish, BT Calling Smartwatch (Jet Black Strap, Regular)`,
				price: 219900, // 2199.00
				imageSrc:
					"https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/8/u/s/-original-imahf5ngfckrg5ug.jpeg?q=70&crop=false",
			},
			{
				name: `Fastrack Revoltt FS1 | 1.83 Display | BT Calling | Fastcharge | 110+ Sports Mode | 200+ WatchFaces Smartwatch  (Black Strap, Free Size)`,
				price: 119900, // 1199.00
				imageSrc:
					"https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/j/h/7/-original-imagvpakfvggsgg5.jpeg?q=70&crop=false",
			},
			{
				name: `Fastrack Optimus Pro with 1.43" AMOLED Display & AOD(466x466),Functional Crown,BT Calling Smartwatch  (Black Strap, Free Size)`,
				price: 219900, // 2199.00
				imageSrc:
					"https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/f/g/g/-original-imagywnz46fngcks.jpeg?q=70&crop=false",
			},
			{
				name: `Noise Colorfit Icon 2 1.8'' Display with Bluetooth Calling, AI Voice Assistant Smartwatch  (Grey Strap, Regular)`,
				price: 139900, // 1399.00
				imageSrc:
					"https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/r/y/f/-original-imagxp8tmkqqspa4.jpeg?q=70&crop=false",
			},
			{
				name: `Zusix Ultra Max 2.2'' HD Display with Bluetooth Calling, AI Voice Assistant Smartwatch  (White Strap, Regular)`,
				price: 149900, // 1499.00
				imageSrc:
					"https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/k/l/r/50-8-sw-ultra-orange-android-ios-zusix-yes-original-imah2zrtpkzgfeug.jpeg?q=70&crop=false",
			},
		],
	});

	console.log("Created products:", products);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

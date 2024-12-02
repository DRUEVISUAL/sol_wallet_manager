export default async function getWSOLPrice(): Promise<number> {
	const response = await fetch(
		'https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112',
	);

	const responseJSON = await response.json();

	const price = (Object.values(responseJSON.data)[0] as Record<string, string>).price as string;

	return Number(price);
}

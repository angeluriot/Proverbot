export function random_probability(probability: number): boolean
{
	if (probability < 0 || probability > 1)
		throw 'Bad probability';

	return Math.random() < probability;
}

export function get_random<T>(array: T[]): T
{
	return array[Math.floor(Math.random() * array.length)];
}

export function replace_possessive(input: string, possessive: string): string
{
	return input.replace('{pos}', possessive);
}

export function upper_first_letter(str: string): string
{
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function random_string(length: number): string
{
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++)
		result += characters.charAt(Math.floor(Math.random() * characters.length));

	return result;
}

export function sleep(ms: number): Promise<void>
{
	return new Promise(r => setTimeout(r, ms));
}

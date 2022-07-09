/**
 * Return true with a given probability.
 * @param probability the probability
 * @returns true with the given probability
 */
export function random_probability(probability: number): boolean
{
	if (probability < 0 || probability > 1)
		throw 'Bad probability';

	return Math.random() < probability;
}

/**
 * Give a random element from a list.
 * @param array the list
 * @returns the random element
 */
export function get_random<T>(array: T[]): T
{
	return array[Math.floor(Math.random() * array.length)];
}

/**
 * Replace {pos} in a string with a given possessive article.
 * @param input the string
 * @param possessive the possessive article
 * @returns the string with the possessive article
 */
export function replace_possessive(input: string, possessive: string): string
{
	return input.replace('{pos}', possessive);
}

/**
 * Upper case the first letter of a string.
 * @param str the string
 * @returns the string with the first letter upper case
 */
export function upper_first_letter(str: string): string
{
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Give a random string of a given length.
 * @param length the length of the string
 * @returns the random string
 */
export function random_string(length: number): string
{
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++)
		result += characters.charAt(Math.floor(Math.random() * characters.length));

	return result;
}

/**
 * Sleep for a given number of milliseconds.
 * @param ms the number of milliseconds
 * @returns a promise that will be resolved after the given number of milliseconds
 */
export function sleep(ms: number): Promise<void>
{
	return new Promise(r => setTimeout(r, ms));
}

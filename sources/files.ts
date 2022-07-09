import * as fs from 'fs';
import * as util from 'util';
import * as Utils from './utils.js';
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

/**
 * Give the number of generated images.
 * @returns the number of generated images
 */
export async function get_nb_genereted(): Promise<number>
{
	const dir = './generated';
	const files = await readdir(dir);
	return files.length;
}

/**
 * Give a random file name from the queue.
 * @returns the file name
 */
export async function get_random_queue(): Promise<string | null>
{
	const dir = './queue';
	const files = await readdir(dir);

	if (files.length === 0)
		return null;

	return Utils.get_random(files);
}

/**
 * Delete a image from its path.
 * @param path the file path
 */
export async function delete_image(path: string): Promise<void>
{
	await unlink(path);
}

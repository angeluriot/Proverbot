import * as fs from 'fs';
import * as util from 'util';
import * as Utils from './utils.js';
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

export async function get_nb_genereted(): Promise<number>
{
	const dir = './generated';
	const files = await readdir(dir);
	return files.length;
}

export async function get_random_queue(): Promise<string | null>
{
	const dir = './queue';
	const files = await readdir(dir);

	if (files.length === 0)
		return null;

	return Utils.get_random(files);
}

export async function delete_image(path: string): Promise<void>
{
	await unlink(path);
}

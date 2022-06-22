import { config } from 'dotenv';
import * as Image from './image.js';
import { load } from '../data/load.js';
import * as Translate from './translation.js';
import * as Twitter from './twitter.js';
import * as Data from './data.js';
import * as Files from './files.js';
import * as Utils from './utils.js';
import schedule from 'node-schedule';
config();

async function post(): Promise<void>
{
	let image = await Files.get_random_queue();

	if (image == null)
	{
		let final_sentence = '';

		while (final_sentence.trim() == '')
		{
			let sentence = Data.generate_sentence();
			final_sentence = await Translate.translated_sentence(sentence);
		}

		await Image.create_image(final_sentence, './queue');
		await Utils.sleep(1000);
		image = await Files.get_random_queue() as string;
	}

	await Twitter.tweet('./queue/' + image);
	await Utils.sleep(3000);
	await Files.delete_image('./queue/' + image);
	console.log('Tweeted');
}

async function main(): Promise<void>
{
	load();
	Translate.authentication();
	Twitter.authentication();
	Image.import_fonts();

	schedule.scheduleJob('0 7 * * *', post);
	schedule.scheduleJob('0 12 * * *', post);
	schedule.scheduleJob('0 16 * * *', post);
	schedule.scheduleJob('0 20 * * *', post);
}

main();

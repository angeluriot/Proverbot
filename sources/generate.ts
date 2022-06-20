import { config } from 'dotenv';
import * as Image from './image.js';
import { load } from '../data/load.js';
import { authentication, translated_sentence } from './translation.js';
import * as Data from './data.js';
import * as Files from './files.js';
config();

async function main(): Promise<void>
{
	load();
	authentication();
	Image.import_fonts();

	const nb_new = 100;
	const nb_old = await Files.get_nb_genereted();

	for (let i = nb_old; i < nb_new; i++)
	{
		let sentence = Data.generate_sentence();
		console.log((i + 1) + ') ' + sentence);
		let french_sentence = await translated_sentence(sentence);
		await Image.create_image(french_sentence, './generated');
	}

	process.exit();
}

main();

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

	const nb_new = process.argv[2] ? parseInt(process.argv[2]) : 0;
	const nb_old = await Files.get_nb_genereted();

	for (let i = nb_old; i < nb_new; i++)
	{
		let  final_sentence = '';

		while (final_sentence.trim() == '')
		{
			let sentence = Data.generate_sentence();
			final_sentence = await translated_sentence(sentence);
		}

		await Image.create_image(final_sentence, './generated');
		console.log((i + 1) + ') ' + final_sentence);
	}

	process.exit();
}

main();

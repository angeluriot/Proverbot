import { Global } from './properties.js';
import * as deepl from 'deepl-node';

/**
 * Authenticate with the DeepL API.
 */
export function authentication(): void
{
	Global.translator = new deepl.Translator((process.env['DEEPL_KEY'] as string));
}

/**
 * Give the French translation of a sentence.
 * @param sentence the sentence to translate
 * @returns the translation
 */
export async function translated_sentence(sentence: string)
{
	let result = await Global.translator.translateText(sentence, 'en', 'fr', {
		splitSentences: 'off',
		formality: 'less'
	});

	return result.text;
}

import { Global, Handle } from './properties.js';
import * as Prop from './properties.js';
import * as Utils from './utils.js';

/**
 * Generate text from an adjective.
 * @param adjective the adjective
 * @returns the text
 */
export function adjective_to_text(adjective: Prop.Word): string
{
	adjective = adjective as Prop.Adjective;
	return adjective.adjective;
}

/**
 * Generate text from a verb.
 * @param verb the verb
 * @param time the time of the verb
 * @returns the text
 */
export function verb_to_text(verb: Prop.Word, time: Prop.Time): string
{
	verb = verb as Prop.Verb;

	if (time == Prop.Time.Base)
		return verb.base;
	else if (time == Prop.Time.Ing)
		return verb.ing;
	else
		return verb.ed;
}

/**
 * Generate text from a noun.
 * @param noun the noun
 * @param plural if the noun is plural
 * @returns the text
 */
export function noun_alone_to_text(noun: Prop.Word, plural: Handle): string
{
	noun = noun as Prop.Noun;

	if (noun.plural == null || plural == 0 || (plural == 1 && Utils.random_probability(0.5)))
	{
		Global.last_word_plural = false;
		return noun.singular;
	}

	Global.last_word_plural = true;
	return (noun.plural as string);
}

/**
 * Generate text from a noun.
 * @param noun the noun
 * @param plural if the noun is plural
 * @param possessive if the noun can have possessive articles
 * @param possessive_article the possessive article
 * @param no_a avoid choosing the a article
 * @returns the text
 */
export function noun_to_text(noun: Prop.Word, plural: Handle, possessive: Handle, possessive_article: string, no_a: boolean = false): string
{
	noun = noun as Prop.Noun;

	function check(str: string): string
	{
		if (str == 'a someone') return 'someone';
		if (str == 'A someone') return 'Someone';
		return str;
	}

	if (possessive_article == '')
		possessive = 0;

	let articles: string[] = [];

	if (noun.type == Prop.Type.Person && !no_a)
		articles.push('a');

	else if (noun.type != Prop.Type.Person)
	{
		if ((noun as Prop.Thing | Prop.Concept).the)
			articles.push('the');

		if ((noun as Prop.Thing | Prop.Concept).a && !no_a)
			articles.push('a');
	}

	if (noun.possessive != 0 && possessive != 0)
		articles.push(possessive_article);

	if ((noun.possessive == 2 && possessive != 0) || (noun.possessive != 0 && possessive == 2))
		articles = [possessive_article];

	if (articles.length == 0 && no_a && (noun as Prop.Thing | Prop.Concept).a)
		plural = 2;

	if (noun.plural == null || plural == 0 || (plural == 1 && Utils.random_probability(0.5)))
	{
		Global.last_word_plural = false;

		if (articles.length == 0)
			return check(noun.singular);

		else
		{
			let article = Utils.get_random(articles);
			return check(article + ' ' + noun.singular);
		}
	}

	Global.last_word_plural = true;

	if ((noun.possessive == 2 && possessive != 0) || (noun.possessive != 0 && possessive == 2) ||
		(noun.possessive != 0 && possessive != 0 && Utils.random_probability(0.25)))
		return check(possessive_article + ' ' + noun.plural);

	return check(noun.plural as string);
}

/**
 * Generate text from a verb noun.
 * @param verb_noun the verb noun
 * @param time the time of the verb
 * @param possessive_article the possessive article
 * @returns the text
 */
export function verb_noun_to_text(verb_noun: Prop.Word, time: Prop.Time, possessive_article: string): string
{
	verb_noun = verb_noun as Prop.VerbNoun;

	if (time == Prop.Time.Base)
		return Utils.replace_possessive(verb_noun.base, possessive_article);
	else if (time == Prop.Time.Ing)
		return Utils.replace_possessive(verb_noun.ing, possessive_article);
	else
		return Utils.replace_possessive(verb_noun.ed, possessive_article);
}

/**
 * Generate text from a sentence.
 * @param sentence the sentence
 * @returns the text
 */
export function sentence_to_text(sentence: Prop.Word): string
{
	sentence = sentence as Prop.Sentence;
	return sentence.sentence;
}

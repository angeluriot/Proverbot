import { Global, Handle } from './properties.js';
import * as Prop from './properties.js';
import * as Utils from './utils.js';

export function get_adjectives(be: Handle): Prop.Adjective[]
{
	let adjectives: Prop.Adjective[] = [];

	for (let adjective of Global.adjectives)
	{
		if (be == 0 && adjective.be != 2)
			adjectives.push(adjective);

		else if (be == 1)
			adjectives.push(adjective);

		else if (be == 2 && adjective.be != 0)
			adjectives.push(adjective);
	}

	return adjectives;
}

export function get_verbs(suite: Handle, able: boolean = false): Prop.Verb[]
{
	let verbs: Prop.Verb[] = [];
	let temp: Prop.Verb[] = [];

	for (let verb of Global.verbs)
	{
		if (suite == 0 && verb.suite != 2)
			temp.push(verb);

		else if (suite == 1)
			temp.push(verb);

		else if (suite == 2 && verb.suite != 0)
			temp.push(verb);
	}

	for (let verb of temp)
	{
		if (!able)
			verbs.push(verb);

		else if (able && verb.able != null)
			verbs.push(verb);
	}

	return verbs;
}

export function get_nouns(thing: boolean, person: boolean, concept: boolean, plural: boolean,
	possessive: Handle, no_a: boolean = false): Prop.Noun[]
{
	let nouns: Prop.Noun[] = [];
	let temp_1: Prop.Noun[] = [];
	let temp_2: Prop.Noun[] = [];
	let Global_nouns = ([] as Prop.Noun[]).concat(thing ? Global.things : [],
		person ? Global.people : [], concept ? Global.concepts : []);

	for (let noun of Global_nouns)
	{
		if (!plural)
			temp_1.push(noun);

		else if (plural && noun.plural != null)
			temp_1.push(noun);
	}

	for (let noun of temp_1)
	{
		if (possessive == 0 && noun.possessive != 2)
			temp_2.push(noun);

		else if (possessive == 1)
			temp_2.push(noun);

		else if (possessive == 2 && noun.possessive != 0)
			temp_2.push(noun);
	}

	if (no_a)
	{
		for (let noun of temp_2)
		{
			if (noun.plural != null || noun.possessive != 0)
				nouns.push(noun);

			else if (noun.type != Prop.Type.Person && (noun as Prop.Thing | Prop.Concept).the)
				nouns.push(noun);
		}
	}

	else
		nouns = temp_2;

	return nouns;
}

export function get_things(plural: boolean, possessive: Handle, no_a: boolean = false): Prop.Thing[]
{
	return get_nouns(true, false, false, plural, possessive, no_a) as Prop.Thing[];
}

export function get_people(plural: boolean, possessive: Handle, no_a: boolean = false): Prop.Person[]
{
	return get_nouns(false, true, false, plural, possessive, no_a) as Prop.Person[];
}

export function get_concepts(plural: boolean, possessive: Handle, no_a: boolean = false, the_ness_of: boolean = false): Prop.Concept[]
{
	let temp = get_nouns(false, false, true, plural, possessive, no_a) as Prop.Concept[];
	let concepts: Prop.Concept[] = [];

	for (let concept of temp)
	{
		if (!the_ness_of)
			concepts.push(concept);

		else if (the_ness_of && concept.the_ness_of)
			concepts.push(concept);
	}

	return concepts;
}

export function get_noun_from_verb(verb: Prop.Word, suite: Handle, thing: boolean, person: boolean,
	concept: boolean, plural: boolean, possessive: Handle, no_a: boolean = false): Prop.Noun | null
{
	if (((verb as Prop.Verb).suite != 0 && suite == 2) || ((verb as Prop.Verb).suite == 2 && suite != 0) ||
		((verb as Prop.Verb).suite == 1 && suite == 1 && Utils.random_probability(0.75)))
	{
		let nouns = get_nouns(thing, person, concept, plural, possessive, no_a);
		return Utils.get_random(nouns);
	}

	return null;
}

export function get_verb_nouns()
{
	return Global.verb_nouns;
}

export function get_sentences()
{
	return Global.sentences;
}

export function choose_random(arrays: Prop.Word[][]): { array_id: number, word: Prop.Word }
{
	let ids: { array_id: number, id: number }[] = [];

	for (let i = 0; i < arrays.length; i++)
		for (let j = 0; j < arrays[i].length; j++)
		{
			ids.push({
				array_id: i,
				id: j
			});
		}

	let id = Utils.get_random(ids);

	return {
		array_id: id.array_id,
		word: arrays[id.array_id][id.id]
	};
}

export function generate_sentence()
{
	let generator = Utils.get_random(Global.generators);
	return generator();
}

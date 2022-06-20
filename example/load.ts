import { Global, Time, Align, Type, Gender } from '../sources/properties.js';
import * as Data from '../sources/data.js';
import * as Utils from '../sources/utils.js';
import * as Text from '../sources/text.js';

export function load()
{
	Global.generators.push(() => {
		let choice_1 = Data.get_people(true, 1);
		let text_1 = Text.noun_to_text(Utils.get_random(choice_1), 2, 1, 'your');

		let choice_2 = Data.get_verbs(1);
		let result_2 = Utils.get_random(choice_2);
		let text_2 = Text.verb_to_text(result_2, Time.Ing);

		let noun = Data.get_noun_from_verb(result_2, 1, true, true, true, false, 1);
		let text_3 = noun != null ? ' ' + Text.noun_to_text(noun, 1, 1, 'their') : '';

		return text_1 + ' like ' + text_2 + text_3;
	});

	Global.images.push({
		url: "./data/image.png",
		min_x: 100,
		min_y: 100,
		max_x: 900,
		max_y: 500,
		align: [Align.Center],
		colors: ["#FFFFFF"],
		rotation: null
	});

	Global.fonts.push({
		name: "Comicsansms",
		url: "./data/Comicsansms.ttf",
		max_size: 78
	});

	Global.verbs.push({
		type: Type.Verb,
		base: "eat",
		ing:"eating" ,
		ed: "ate",
		able: "edible",
		un_able: "inedible",
		suite: 1
	});

	Global.things.push({
		type: Type.Thing,
		singular: "pizza",
		plural: "pizzas",
		the: false,
		a: true,
		possessive: 0
	});

	Global.people.push({
		type: Type.Person,
		singular: "developer",
		plural: "developers",
		possessive: 0,
		gender: Gender.Male
	});
}

import * as deepl from 'deepl-node';
import Twit from 'twit';

export class Global
{
	static translator: deepl.Translator;
	static twitter_client: Twit;
	static post: any;
	static generators: (() => string)[] = [];
	static adjectives: Adjective[] = [];
	static verbs: Verb[] = [];
	static things: Thing[] = [];
	static people: Person[] = [];
	static concepts: Concept[] = [];
	static verb_nouns: VerbNoun[] = [];
	static sentences: Sentence[] = [];
	static images: Image[] = [];
	static fonts: Font[] = [];
	static last_word_plural = false;
}

export enum Handle { Not = 0, Both = 1, Only = 2 }
export enum Time { Base, Ing, Ed }
export enum Type { Adjective, Verb, Thing, Person, Concept, Sentence, VerbNoun }
export enum Align { Left, Center, Right }
export enum Gender { Male, Female }

export type Adjective = {
	type: Type,
	adjective: string,
	be: Handle,
}

export type Verb = {
	type: Type,
	base: string,
	ing: string,
	ed: string,
	able: string | null,
	un_able: string | null,
	suite: Handle,
};

export type Thing = {
	type: Type,
	singular: string,
	plural: string | null,
	the: boolean,
	a: boolean,
	possessive: Handle,
};

export type Person = {
	type: Type,
	singular: string,
	plural: string | null,
	possessive: Handle,
	gender: Gender
};

export type Concept = {
	type: Type,
	singular: string,
	plural: string | null,
	the: boolean,
	a: boolean,
	possessive: Handle,
	the_ness_of: boolean
};

export type VerbNoun = {
	type: Type,
	base: string,
	ing: string,
	ed: string
};

export type Sentence = {
	type: Type,
	sentence: string,
};

export type Image = {
	url: string,
	min_x: number,
	min_y: number,
	max_x: number,
	max_y: number,
	align: Align[],
	colors: string[],
	rotation: number | null
};

export type Font = {
	name: string,
	url: string,
	max_size: number
};

export type Noun = Thing | Person | Concept;
export type Word = Adjective | Verb | Thing | Person | Concept | VerbNoun | Sentence;


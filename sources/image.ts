import * as Utils from './utils.js';
import * as Bug from 'canvas';
import { Global } from './properties.js';
import * as Prop from './properties.js';
const Canvas = (Bug as any).default;
import fs from 'fs';

/**
 * Import all fonts.
 */
export function import_fonts()
{
	for (let font of Global.fonts)
		Canvas.registerFont(font.url, { family: font.name });
}

/**
 * Give the box of a text.
 * @param context the canvas context
 * @param lines the text lines
 * @param font the font
 * @param font_size the font size
 * @returns the box
 */
function get_box(context: any, lines: string[], font: string, font_size: number): { width: number, height: number }
{
	let width = 0;
	context.font = font_size + "px " + font;

	for (let line of lines)
		if (width < context.measureText(line).width)
			width = context.measureText(line).width;

	return { width: width, height: lines.length * font_size + (lines.length - 1) * font_size * 0.2 };
}

/**
 * Check if the text fit in the image.
 * @param context the canvas context
 * @param text the text
 * @param min_x the minimum x
 * @param min_y the minimum y
 * @param max_x the maximum x
 * @param max_y the maximum y
 * @param font the font
 * @param font_size the font size
 * @returns the text lines
 */
function is_text_enter(context: any, text: string, min_x: number, min_y: number, max_x: number,
	max_y: number, font: string, font_size: number): string[] | null
{
	let words = text.replace('-', '- ').trim().split(' ');
	let lines: string[] = [''];

	context.font = font_size + "px " + font;

	for (let word of words)
	{
		if (context.measureText(word).width > max_x - min_x)
			return null;

		let test_line = (lines[lines.length - 1] + ' ' + word).trim().replace('- ', '-');
		let test_width = context.measureText(test_line).width;

		if (test_width > max_x - min_x)
			lines.push(word);
		else
			lines[lines.length - 1] = test_line;
	}

	let box = get_box(context, lines, font, font_size);

	if (box.height > max_y - min_y)
		return null;

	return lines;
}

/**
 * Find the best font size to fit the text in the image.
 * @param context the canvas context
 * @param text the text
 * @param min_x the minimum x
 * @param min_y the minimum y
 * @param max_x the maximum x
 * @param max_y the maximum y
 * @param font the font
 * @param max_font_size the maximum font size
 * @returns the font size
 */
function find_size(context: any, text: string, min_x: number, min_y: number, max_x: number,
	max_y: number, font: string, max_font_size: number): { font_size: number, lines: string[] }
{
	let lines = null;

	for (var font_size = max_font_size; lines == null; font_size--)
		lines = is_text_enter(context, text, min_x, min_y, max_x, max_y, font, font_size);

	return { font_size: font_size, lines: lines };
}

/**
 * Write the text on the image.
 * @param context the canvas context
 * @param text the text
 * @param min_x the minimum x
 * @param min_y the minimum y
 * @param max_x the maximum x
 * @param max_y the maximum y
 * @param align the alignement
 * @param font the font
 * @param max_font_size the maximum font size
 * @param font_color the font color
 */
function write_text(context: any, text: string, min_x: number, min_y: number, max_x: number,
	max_y: number, align: Prop.Align, font: string, max_font_size: number, font_color: string): void
{
	let result = find_size(context, text, min_x, min_y, max_x, max_y, font, max_font_size);
	let font_size = result.font_size;
	let lines = result.lines;
	let box = get_box(context, lines, font, font_size);
	let line_height = font_size * 1.2;
	let x = min_x + (max_x - min_x - box.width) / 2.;
	let y = min_y + (max_y - min_y - box.height) / 2. + font_size;
	let line_x: number;

	context.font = font_size + "px " + font;
	context.fillStyle = font_color;

	for (let line of lines)
	{
		if (align == Prop.Align.Left)
			line_x = x;
		else if (align == Prop.Align.Center)
			line_x = x + (box.width - context.measureText(line).width) / 2.;
		else
			line_x = x + box.width - context.measureText(line).width;

		context.fillText(line, line_x, y);
		y += line_height;
	}
}

/**
 * Create the image from the sentence.
 * @param sentence the sentence
 * @param location the location of the image
 */
export async function create_image(sentence: string, location: string): Promise<void>
{
	const canvas = Canvas.createCanvas(1000, 1000);
	const ctx = canvas.getContext('2d');

	// Draw background
	let image = Utils.get_random(Global.images);
	let background = await Canvas.loadImage(image.url);
	ctx.drawImage(background, 0, 0, 1000, 1000);

	// Draw text
	let color = Utils.get_random(image.colors);
	let align = Utils.get_random(image.align);
	let font = Utils.get_random(Global.fonts);

	if (image.rotation != null)
		ctx.rotate(image.rotation);

	write_text(ctx, sentence, image.min_x, image.min_y, image.max_x, image.max_y, align, font.name, font.max_size, color);

	// Save to file
	const buffer = canvas.toBuffer('image/png');
	fs.writeFileSync(`${location}/${Utils.random_string(16)}.png`, buffer);
}

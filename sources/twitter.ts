import Twit from 'twit';
import { Global } from './properties.js';
import util from 'util';
import fs from 'fs';

export function authentication(): void
{
	Global.twitter_client = new Twit({
		consumer_key: process.env.TWITTER_API_KEY as string,
		consumer_secret: process.env.TWITTER_API_SECRET as string,
		access_token: process.env.TWITTER_ACCESS_TOKEN as string,
		access_token_secret: process.env.TWITTER_ACCESS_SECRET as string
	});

	Global.post = util.promisify(Global.twitter_client.post).bind(Global.twitter_client);
}

export async function tweet(image: string): Promise<void>
{
	let b64content = fs.readFileSync(image, { encoding: 'base64' });
	const data = await Global.post('media/upload', { media_data: b64content });

	var meta_params = { media_id: data.media_id_string, alt_text: { text: '' } };
	await Global.post('media/metadata/create', meta_params);

	var params = { status: '', media_ids: [data.media_id_string] };
	await Global.post('statuses/update', params);
}

import { TwitterApi } from 'twitter-api-v2';
import { Global } from './properties.js';

/**
 * Authenticate with the Twitter API.
 */
export function authentication(): void
{
	Global.twitter_client = new TwitterApi({
		appKey: process.env['TWITTER_APP_KEY'] as string,
		appSecret: process.env['TWITTER_APP_SECRET'] as string,
		accessToken: process.env['TWITTER_ACCESS_TOKEN'] as string,
		accessSecret: process.env['TWITTER_ACCESS_SECRET'] as string
	}).readWrite;
}

/**
 * Tweet a image.
 * @param image the image
 */
export async function tweet(image: string): Promise<void>
{
	const media_id = await Global.twitter_client.v1.uploadMedia(image);

	await Global.twitter_client.v2.tweet({
		media: {
			media_ids: [media_id]
		}
	});
}

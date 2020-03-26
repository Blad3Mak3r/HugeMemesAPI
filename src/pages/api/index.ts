import { NowRequest, NowResponse } from '@now/node'
import Axios from 'axios';

const subreddits: String[] = new Array<String>("memes", "dankmemes", "meirl");

export default async (req: NowRequest, res: NowResponse) => {

    try {
        const result = await Axios.get(`https://www.reddit.com/r/${randomReddit()}/hot/.json?count=100`)

        if(result.status == 200) {
            let post = result.data.data.children[randomNumber(result.data.data.children.length)].data;

            const response = {
                id: post.id,
                subreddit: post.subreddit,
                title: post.title,
                author: post.author,
                image: post.url,
                ups: post.ups,
                downs: post.downs,
                score: post.score,
                created_utc: post.created_utc
            }

            res.statusCode == 200;
            res.json(response)
        } else {
            res.statusCode == res.statusCode;
            res.json(result.data);
        }
    } catch (e) {
        console.log(e)
        res.statusCode = 500;
        res.json({})
    }
}

function randomNumber(number: number): number {
    return Math.floor(Math.random() * number);
}

function randomReddit(): String {
    return subreddits[randomNumber(subreddits.length)];
}

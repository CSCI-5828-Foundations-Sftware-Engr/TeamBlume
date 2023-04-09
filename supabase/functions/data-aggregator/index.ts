import { Redis } from 'https://deno.land/x/upstash_redis@v1.19.3/mod.ts'
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();
//import env variables from .env file


import {
  scrapeAmazon,
  scrapeBestBuy
} from '../../../core/electronics_scrape';


const redis = new Redis({

    url: env.UPSTASH_URL,
    token: env.UPSTASH_TOKEN,
  
});

const getProducts = async () => {
  const amazonRes = await scrapeAmazon();
  const bestbuyRes = await scrapeBestBuy();
  return { amazonProducts: amazonRes, bestbuyProducts: bestbuyRes };
};

getProducts().then((res) => {

  // use upstash to store the data
  redis.set('electronics', JSON.stringify(res.amazonProducts));
  redis.set('electronics', JSON.stringify(res.bestbuyProducts));

});
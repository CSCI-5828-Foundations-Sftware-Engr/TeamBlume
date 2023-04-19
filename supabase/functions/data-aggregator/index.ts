import { scrapeBestBuy  } from "./best_buy.ts";   // <--- import the scrapeBestBuy function
import { scrapeWalmart } from "./walmart_electronics.ts";
import {scrapeWalmartGrocery} from "./walmart_grocery.ts";
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { Redis } from 'https://deno.land/x/upstash_redis@v1.19.3/mod.ts'
//import { config } from 'https://deno.land/x/dotenv@v3.2.2/mod.ts';


serve(async (_req) => {

    try {
        //const env = config();
        const redis = new Redis({
        url: Deno.env.get('UPSTASH_URL')!,
        token: Deno.env.get('UPSTASH_TOKEN')!,
      })
  
    
      // call the scrapeBestBuy function
       // const products = await scrapeBestBuy()
        // call the scrapeWalmart function
        const walmartProducts = await scrapeWalmartGrocery()
        console.log(walmartProducts);

        // store the products in redis
       // await redis.set('products', JSON.stringify(products))
         await redis.set('key', 'value');
         const data = await redis.get('key');
         console.log(data);
  
      return new Response(JSON.stringify({ walmartProducts }), { status: 200 })
    
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 200 })
    }
  })


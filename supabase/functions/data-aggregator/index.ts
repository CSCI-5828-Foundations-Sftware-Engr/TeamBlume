// deno-lint-ignore-file no-explicit-any
import { scrapeBestBuy  } from "./best_buy.ts";   // <--- import the scrapeBestBuy function
import { scrapeWalmart } from "./walmart_electronics.ts";
import {scrapeWalmartGrocery} from "./walmart_grocery.ts";
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { Redis } from 'https://deno.land/x/upstash_redis@v1.19.3/mod.ts'
import { GROCERY } from "./grocery_items.ts";

// declare a function to get price from string
const getPriceFromString = (str: string) => {
    const price = str.slice(str.indexOf("$") + 1);
    return parseFloat(price);
}

serve(async (_req) => {

    try {
        // //const env = config();
        const redis = new Redis({
        url: 'https://usw1-special-silkworm-33116.upstash.io',
        token: 'AYFcASQgYWZiNDhjZTgtYjQwMi00NWY0LWFiYWQtMWExYWY5Mjc1MmUyNTgxMjYxOGQ5YjU5NDIxZmE5YzRiMmJjMWQwODA2MTg='
       
      });
     
       //initialize an emptry object
      const walmart_grocery = {} as any;

      for (const item of Object.keys(GROCERY)) {
       // console.log(item);
        // put this item in the object
        walmart_grocery[item] = await scrapeWalmartGrocery(GROCERY[item]);
    }
   // console.log(walmart_grocery);

        redis.get('walmart_grocery').then((value) => {

            if (value) {
              
              const data = JSON.parse(JSON.stringify(value));
              let old_price = (data["1"]["price"]).toString();
              old_price = parseFloat(old_price.slice(old_price.indexOf("$") + 1));

              for (const item of Object.keys(GROCERY)) {
                const new_price = getPriceFromString((walmart_grocery[item]["price"]).toString());
                const old_price = getPriceFromString((data[item]["price"]).toString());

                 if( new_price != old_price ){
                    console.log(item);
                    data[item]["price"] = walmart_grocery[item]["price"];
                    

                 } else{

                      console.log("no change");
                 }

              }
              redis.set('walmart_grocery', JSON.stringify(data));
              return new Response(JSON.stringify({ data }), { status: 200 })
            }
            else {
              redis.set('walmart_grocery', JSON.stringify(walmart_grocery));
            }
        });

      
        
        
      return new Response(JSON.stringify({ walmart_grocery }), { status: 200 })
    
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 200 })
    }
  })


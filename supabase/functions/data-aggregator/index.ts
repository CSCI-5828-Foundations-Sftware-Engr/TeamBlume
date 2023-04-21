// deno-lint-ignore-file no-explicit-any
import { scrapeBestBuy  } from "./best_buy.ts";   // <--- import the scrapeBestBuy function
import { scrapeWalmart } from "./walmart_electronics.ts";
import {scrapeWalmartGrocery} from "./walmart_grocery.ts";
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { Redis } from 'https://deno.land/x/upstash_redis@v1.19.3/mod.ts'
import { GROCERY, ELECTRONICS } from './product_list.ts';

// declare a function to get price from string
const getPriceFromString = (str: string) => {
    const price = str.slice(str.indexOf("$") + 1);
    return parseFloat(price);
}


const comparePrice = (channel:any, redis:any) => {


  const channel_name = channel["1"]["platform"];
  redis.get(channel_name).then((value:any) => {
    

    if (value) {
      
      const data = JSON.parse(JSON.stringify(value));
      let old_price = (data["1"]["price"]).toString();
      old_price = parseFloat(old_price.slice(old_price.indexOf("$") + 1));

      for (const item of Object.keys(GROCERY)) {
        const new_price = getPriceFromString((channel[item]["price"]).toString());
        const old_price = getPriceFromString((data[item]["price"]).toString());

         if( new_price != old_price ){
            console.log(item);
            data[item]["price"] = channel[item]["price"];
         } else{

              console.log("no change");
         }

      }
      redis.set(channel_name, JSON.stringify(data));
      return new Response(JSON.stringify({ data }), { status: 200 })
    }
    else {
      redis.set(channel_name, JSON.stringify(channel));
    }
});
  
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
      const walmart_electronics = {} as any;
      const best_buy = {} as any;

      for (const item of Object.keys(GROCERY)) {
       // console.log(item);
        // put this item in the object
        walmart_grocery[item] = await scrapeWalmartGrocery(GROCERY[item]);
    }

      for(const item of Object.keys(ELECTRONICS)){
        walmart_electronics[item] = await scrapeWalmart(ELECTRONICS[item]);
        best_buy[item] = await scrapeBestBuy(ELECTRONICS[item]);
      }


        // redis.get('walmart_grocery').then((value) => {

        //     if (value) {
              
        //       const data = JSON.parse(JSON.stringify(value));
        //       let old_price = (data["1"]["price"]).toString();
        //       old_price = parseFloat(old_price.slice(old_price.indexOf("$") + 1));

        //       for (const item of Object.keys(GROCERY)) {
        //         const new_price = getPriceFromString((walmart_grocery[item]["price"]).toString());
        //         const old_price = getPriceFromString((data[item]["price"]).toString());

        //          if( new_price != old_price ){
        //             console.log(item);
        //             data[item]["price"] = walmart_grocery[item]["price"];
                    

        //          } else{

        //               console.log("no change");
        //          }

        //       }
        //       redis.set('walmart_grocery', JSON.stringify(data));
        //       return new Response(JSON.stringify({ data }), { status: 200 })
        //     }
        //     else {
        //       redis.set('walmart_grocery', JSON.stringify(walmart_grocery));
        //     }
        // });
        const walmart_grocery_data = await comparePrice(walmart_grocery, redis);
        const walmart_electronics_data = await comparePrice(walmart_electronics, redis);
        const best_buy_data = await comparePrice(best_buy, redis);

        console.log(walmart_grocery_data, walmart_electronics_data, best_buy_data);
      
        
        
      return new Response(JSON.stringify({ walmart_grocery }), { status: 200 })
    
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 200 })
    }
  })


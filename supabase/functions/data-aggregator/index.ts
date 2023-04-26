// deno-lint-ignore-file no-explicit-any
import { scrapeBestBuy  } from "./best_buy.ts";   // <--- import the scrapeBestBuy function
import { scrapeWalmart } from "./walmart_electronics.ts";
import {scrapeWalmartGrocery} from "./walmart_grocery.ts";
import { scrapeKingSoopers } from "./kingsoopers.ts";
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { Redis } from 'https://deno.land/x/upstash_redis@v1.19.3/mod.ts'
import { GROCERY, ELECTRONICS } from './product_list.ts';
import "https://deno.land/std@0.184.0/dotenv/load.ts";


// declare a function to get price from string
const getPriceFromString = (str: string) => {
    const price = str.slice(str.indexOf("$") + 1);
    return parseFloat(price);
}


const comparePrice = (channel:any, redis:any) => {

  const channels = ["walmart_grocery", "walmart_electronics", "bestbuy", "kingsoopers"]

  for (const item of Object.keys(channel)){
    
    const channel_name = channel[item]["platform"];
    redis.get(channel_name).then((value:any) => {
      if (value) {
        const data = JSON.parse(JSON.stringify(value));
        const new_price = getPriceFromString((channel[item]["price"]).toString());
        const old_price = getPriceFromString((data[item]["price"]).toString());

        const old_image = data[item]["image"];
        const new_image = channel[item]["image"];

        const old_link = data[item]["link"];
        const new_link = channel[item]["link"];

        const old_rating = data[item]["rating"];
        const new_rating = channel[item]["rating"];

        const old_numReviews = data[item]["numReviews"];
        const new_numReviews = channel[item]["numReviews"];

        if( new_price != old_price && new_price != null){
            console.log("Price updated for " + channel_name +" " + channel[item]["title"]);
            data[item]["price"] = channel[item]["price"];
         } 
         else if( new_image != old_image && new_image != null){
            console.log("Image updated" +" " + channel[item]["title"]);
            data[item]["image"] = channel[item]["image"];
          }
          else if( new_link != old_link && new_link != null ){
              console.log("Link updated for " + channel_name +" " + channel[item]["title"]);
              data[item]["link"] = channel[item]["link"];
            }    
              else if( new_rating != old_rating && new_rating != null ){
                  
                  console.log("Rating updated for " + channel_name +" " + channel[item]["title"]);
                  data[item]["rating"] = channel[item]["rating"];
                }
                else if( new_numReviews != old_numReviews && new_numReviews != null){

                  console.log("Number of reviews updated for " + channel_name +" " + channel[item]["title"]);
                  data[item]["numReviews"] = channel[item]["numReviews"];
                }
         else{

              console.log("no change");
         }
      }
      else {
        redis.set(channel_name, JSON.stringify(channel));
      }
    });

  }

  // if(channel["1"]["platform"]){
  // const channel_name = channel["1"]["platform"];
  
  // redis.get(channel_name).then((value:any) => {
    

  //   if (value) {
      
  //     const data = JSON.parse(JSON.stringify(value));
  //     let old_price = (data["1"]["price"]).toString();
  //     old_price = parseFloat(old_price.slice(old_price.indexOf("$") + 1));

  //     for (const item of Object.keys(GROCERY)) {
  //       const new_price = getPriceFromString((channel[item]["price"]).toString());
  //       const old_price = getPriceFromString((data[item]["price"]).toString());

  //        if( new_price != old_price ){
  //         //  console.log(item);
  //           data[item]["price"] = channel[item]["price"];
  //        } else{

  //             console.log("no change");
  //        }

  //     }
      
  //     redis.set(channel_name, JSON.stringify(data));
  //     return new Response(JSON.stringify({ data }), { status: 200 })
  //   }
  
  //   else {
  //     redis.set(channel_name, JSON.stringify(channel));
  //   }
  //   });
  // }
}

serve(async (_req) => {

    try {
        // //const env = config();
        const redis = new Redis({
        url: Deno.env.get('UPSTASH_URL')!,
        token: Deno.env.get('UPSTASH_TOKEN')!,
       
      });
     
       //initialize an emptry object
      const walmart_grocery = {} as any;
      const walmart_electronics = {} as any;
      const best_buy = {} as any;
      const kingsoopers ={} as any;

      for (const item of Object.keys(GROCERY)) {
      
        walmart_grocery[item] = await scrapeWalmartGrocery(GROCERY[item]);
        kingsoopers[item] = await scrapeKingSoopers(GROCERY[item]);

    }

      for(const item of Object.keys(ELECTRONICS)){

        walmart_electronics[item] = await scrapeWalmart(ELECTRONICS[item]);
        best_buy[item] = await scrapeBestBuy(ELECTRONICS[item]);

      }

      console.log(kingsoopers);
    //  console.log(walmart_grocery);
    //  console.log(walmart_electronics);
    //  console.log(best_buy);

        const walmart_grocery_data = await comparePrice(walmart_grocery, redis);
        const walmart_electronics_data = await comparePrice(walmart_electronics, redis);
        const best_buy_data = await comparePrice(best_buy, redis);
        const kingsoopers_data = await comparePrice(kingsoopers, redis);

       
     //   console.log(walmart_grocery_data, walmart_electronics_data, best_buy_data);
 
      return new Response(JSON.stringify({ walmart_grocery }), { status: 200 })
    
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 200 })
    }
  })


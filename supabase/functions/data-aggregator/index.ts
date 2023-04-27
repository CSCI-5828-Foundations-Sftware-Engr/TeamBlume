// deno-lint-ignore-file no-explicit-any
import { scrapeBestBuy } from './best_buy.ts'; // <--- import the scrapeBestBuy function
import { scrapeWalmart } from './walmart_electronics.ts';
import { scrapeWalmartGrocery } from './walmart_grocery.ts';
import { scrapeKingSoopers } from './kingsoopers.ts';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { Redis } from 'https://deno.land/x/upstash_redis@v1.20.4/mod.ts';
import { GROCERY, ELECTRONICS } from './product_list.ts';
import {
  create,
  getNumericDate,
  Header
} from 'https://deno.land/x/djwt@v2.8/mod.ts';

const jwt_token = Deno.env.get('JWT_TOKEN')!;

const encoder = new TextEncoder();
const data = encoder.encode(jwt_token);

const key = await crypto.subtle.importKey(
  'raw',
  data,
  { name: 'HMAC', hash: 'SHA-256' },
  true,
  ['sign', 'verify']
);

const algorithm = 'HS256';

const header: Header = {
  alg: algorithm,
  typ: 'JWT',
  foo: 'bar' // custom header
};

const rest_token = await create(
  header,
  { foo: 'bar', exp: getNumericDate(600) },
  key
);

// declare a function to get price from string
const getPriceFromString = (str: string) => {
  const price = str.slice(str.indexOf('$') + 1);
  return parseFloat(price);
};

const comparePrice = async (
  channel: any,
  redis: Redis,
  channel_name: string
) => {

  type priceChange = {
    product_id: string;
    platform: string;
    price: number;
    product_link: string;
    ratings: number;
    numReviews: number;
  };
  const changed: priceChange[] = [];

  const PriceChange: priceChange = {
    product_id: '',
    platform: '',
    price: 0,
    product_link: '',
    ratings: 0,
    numReviews: 0
  };

  await redis.get(channel_name).then(async (value: any) => {
    if (value) {
      const data = JSON.parse(JSON.stringify(value));
      for (const item of Object.keys(channel)) {
        if ( channel[item] != undefined) {

          if(data[item] == undefined) {
              data[item] = channel[item];
          }else{
          
          if (channel[item]['price'] != undefined ) {
            PriceChange.platform = channel_name;

          const new_price = await getPriceFromString(
            channel[item]['price'].toString()
          );
          const old_price = await getPriceFromString(
            data[item]['price'].toString()!
          )!;

          const old_image = data[item]['image'];
          const new_image = channel[item]['image'];

          const old_link = data[item]['link'];
          const new_link = channel[item]['link'];

          const old_rating = data[item]['rating'];
          const new_rating = channel[item]['rating'];

          const old_numReviews = data[item]['numReviews'];
          const new_numReviews = channel[item]['numReviews'];

            if (new_price != old_price && new_price != null) {
              console.log(
                'Price updated for ' +
                  channel_name +
                  ' ' +
                  channel[item]['price']
              );
              data[item]['price'] = channel[item]['price'];
              PriceChange.product_id = item;
              PriceChange.price = new_price;
            }
            if (new_image != old_image && new_image != null) {
              console.log('Image updated' + ' ' + channel[item]['title']);
              data[item]['image'] = channel[item]['image'];
              PriceChange.product_link = new_image;
              PriceChange.product_id = item;
            }
            if (new_link != old_link && new_link != null) {
              console.log(
                'Link updated for ' +
                  channel_name +
                  ' ' +
                  channel[item]['title']
              );

              data[item]['link'] = channel[item]['link'];
              PriceChange.product_link = new_link;
              PriceChange.product_id = item;
            }
            if (new_rating != old_rating && new_rating != null) {
              console.log(
                'Rating updated for ' +
                  channel_name +
                  ' ' +
                  channel[item]['title']
              );

              data[item]['rating'] = channel[item]['rating'];
              PriceChange.ratings = new_rating;
              PriceChange.product_id = item;
            }
            if (new_numReviews != old_numReviews && new_numReviews != null) {
              console.log(
                'Number of reviews updated for ' +
                  channel_name +
                  ' ' +
                  channel[item]['title']
              );

              data[item]['numReviews'] = channel[item]['numReviews'];
              PriceChange.numReviews = new_numReviews;
              PriceChange.product_id = item;
            }
          }
          }
        } else {
          console.log('Item is undefined');
        }
      }

      await redis.set(channel_name, JSON.stringify(data));
      if (PriceChange.product_id != '') {
        changed.push(PriceChange);
      }
  
      // call the api to send the changed data
      if (changed.length > 0) {
        const api_data = { changed: changed };
        console.log(api_data);
        //call the api to send the changed data
        const response = await fetch('https://blume-52sdbar5dq-uc.a.run.app/api/price/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
  
            Authorization: 'Bearer ' + rest_token
          },
          body: JSON.stringify(api_data)
        });
        const data = await response.json();
        console.log(data);
  
      }
    } else {
      console.log('Adding newly-----------------' + channel_name);
      await redis.set(channel_name, JSON.stringify(channel));
    }

  });
};

serve(async _req => {
  try {
    // //const env = config();
    const redis = new Redis({
      url: Deno.env.get('UPSTASH_URL')!,
      token: Deno.env.get('UPSTASH_TOKEN')!
    });

    //initialize an emptry object
    const walmart_grocery = {} as any;
    const walmart_electronics = {} as any;
    const best_buy = {} as any;
    const kingsoopers = {} as any;

    for (const item of Object.keys(GROCERY)) {
      walmart_grocery[item] = await scrapeWalmartGrocery(GROCERY[item]);
      kingsoopers[item] = await scrapeKingSoopers(GROCERY[item]);
    }

    for (const item of Object.keys(ELECTRONICS)) {
      walmart_electronics[item] = await scrapeWalmart(ELECTRONICS[item]);
      best_buy[item] = await scrapeBestBuy(ELECTRONICS[item]);
    }


    await comparePrice(walmart_grocery, redis, 'walmart_grocery');
    await comparePrice(walmart_electronics, redis, 'walmart_electronics');
    await comparePrice(best_buy, redis, 'best_buy');
    await comparePrice(kingsoopers, redis, 'kingsoopers');

    return new Response(JSON.stringify({ status: 'All ok' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 200
    });
  }
});
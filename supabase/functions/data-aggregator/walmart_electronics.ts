import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12';

export const scrapeWalmart = async (search: any) => {
  try {
    
    const result = await axiod.get(

      'https://www.walmart.com/search?q=' + search,
      {
        headers: {
          'Accept-enconding': 'application/gzip',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'
        }
      }
    );

    const html = result.data;
    const $ = cheerio.load(html);
    //console.log($.html());
    type Product = {
      platform: string;
      title: string;
      price: string;
      image: string;
      link: string;
      rating: string;
      numReviews: string;
    };

    const products: Product[] = [];

    // deno-lint-ignore no-explicit-any
    $('.mb0.ph1.pa0-xl.bb.b--near-white.w-25').each((_: any, element: any) => {
      if (products.length >= 1) return false;
      const image = $(element).find('img.absolute.top-0.left-0').attr('src')!;
      const link = $(element)
        .find('a.absolute.w-100.h-100.z-1.hide-sibling-opacity')
        .attr('href');
      const title = $(element)
        .find('a.absolute.w-100.h-100.z-1.hide-sibling-opacity > span')
        .text();
      const price = $(element)
        .find('div.flex.flex-wrap.justify-start.items-center.lh-title.mb1 > span.w_iUH7')
        .text();
      const rating = $(element)
        .find('div.flex.items-center.mt2 > span.w_iUH7')
        .text()
        .split(' ')[0];
      const numReviews = $(element)
        .find('div.flex.items-center.mt2 > span[aria-hidden="true"]')
        .text();

      const scraped: {
        platform: string;
        title: string;
        price: string;
        image: string;
        link: string;
        rating: string;
        numReviews: string;
      } = {
        platform: 'walmart_electronics',
        title: title,
        price: price,
        image: image,
        link: 'https://walmart.com' + link,
        rating: rating,
        numReviews: numReviews
      };
      products.push(scraped);
    });
    // console.log(products);
    return new Promise((resolve, _reject) => {
      resolve(products[0]);
    });
  } catch (error) {
    console.log(error);
  }
};

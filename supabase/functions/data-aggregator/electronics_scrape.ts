import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";


export const scrapeAmazon = async () => {
  try {
    const product = 'mouse';
    const brand = 'Logitech';
    const result = await axiod.get(
      'https://www.amazon.com/s?k=' +
        product +
        '&rh=n%3A172282%2Cp_89%3A' +
        brand +
        '&dc&ds=v1%3AFUA1yqkcxwtsK0aIwNxdhCxqMEBa38xMZ36NHSDziUg&crid=1XT8C0G6X00TW&qid=1680129742&rnid=2528832011&sprefix=%2Caps%2C94&ref=sr_nr_p_89_1',
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Max-Age": "86400",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Made-By": atob('VHVoaW4gS2FudGkgUGFsLCBodHRwczovL2dpdGh1Yi5jb20vY2FjaGVjbGVhbmVyamVldA=='),
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          "Referer": "https://www.amazon.com/",

        }
      }
    );

    const html = result.data;
    const $ = cheerio.load(html);
    const products: {
      platform: string,
      title: string,
      price: string,
      image: string,
      link: string,
      rating: string,
      numReviews: string
    }[] = [];
    $(
      'div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16'
    // deno-lint-ignore no-explicit-any
    ).each((_: any, element: any ) => {
      const title = $(element)
        .find('span.a-size-medium.a-color-base.a-text-normal')
        .text();
      const price = $(element).find('span.a-offscreen').text();
      const image = $(element).find('img.s-image').attr('src')!;
      const link = $(element)
        .find('a.a-link-normal.a-text-normal')
        .attr('href');
      const rating = $(element)
        .find(
          'div.a-section.a-spacing-none.a-spacing-top-micro > div > span > span.a-size-base'
        )
        .text();
      const numReviews = $(element)
        .find(
          'div.a-section.a-spacing-none.a-spacing-top-micro > div > span > a > span'
        )
        .text();
      //   console.log(title)
      products.push({
        platform: 'amazon',
        title,
        price,
        image,
        link: `https://amazon.com${link}`,
        rating,
        numReviews
      });
    });

    // console.log(products);
    return new Promise((resolve, _reject) => {
      resolve(products);
    });
  } catch (error) {
    console.log(error);
  }
};

export const scrapeBestBuy = async () => {
  try {
    const product = 'mouse';
    const brand = 'Logitech';
    const result = await axiod.get(
      'https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=brand_facet%3DBrand~' +
        brand +
        '&st=' +
        product +
        '',
      {
        headers: {
          'Accept-enconding': 'application/gzip',
          'User-Agent': 'axiod 1.3.4'
        }
      }
    );

    const html = result.data;
    const $ = cheerio.load(html);
    //console.log($.html());
    const products: {
      platform: string,
      title: string,
      price: string,
      image: string,
      link: string,
      rating: string,
      numReviews: string
    }[] = [];
    // deno-lint-ignore no-explicit-any
    $('ol.sku-item-list > li.sku-item').each((_ : any, element : any) => {
      const image = $(element).find('img.product-image').attr('src')!;
      const link = $(element).find('.sku-title > a').attr('href');
      const title = $(element).find('.sku-title').text();
      const price = $(element)
        .find(
          'div.priceView-hero-price.priceView-customer-price > span[aria-hidden="true"]'
        )
        .text();
      const rating = $(element).find('p.visually-hidden').text();
      const numReviews = rating.split(' ')[7];
      products.push({
        platform: 'bestbuy',
        title,
        image,
        link: `https://bestbuy.com${link}`,
        price,
        rating: rating.split(' ')[1],
        numReviews
      });
    });
    // console.log(products);
    return new Promise((resolve, _reject) => {
      resolve(products);
    });
  } catch (error) {
    console.log(error);
  }
};

// const _redis = new Redis({
//   url: env.UPSTASH_URL,
//   token: env.UPSTASH_TOKEN
// });

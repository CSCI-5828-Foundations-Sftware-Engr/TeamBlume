import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";


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
    console.log("ERROR" + error);
  }
};

import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12';

export const scrapeBestBuy = async (search: any) => {
  try {
    
    const result = await axiod.get(
      // 'https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=brand_facet%3DBrand~' +
      //   brand +
      //   '&st=' +
      //   product +
      //   '',
      'https://www.bestbuy.com/site/searchpage.jsp?st=' + search,
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
    $('ol.sku-item-list > li.sku-item').each((_: any, element: any) => {
      if (products.length >= 1) return false;
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
      const scraped: {
        platform: string;
        title: string;
        price: string;
        image: string;
        link: string;
        rating: string;
        numReviews: string;
      } = {
        platform: 'bestbuy',
        title: title,
        price: price,
        image: image,
        link: `https://www.bestbuy.com${link}`,
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
    console.log('ERROR' + error);
  }
};

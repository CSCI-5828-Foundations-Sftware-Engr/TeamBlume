import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12';

// deno-lint-ignore no-explicit-any
export const scrapeKingSoopers = async (search: any) => {

  try {
    
    const result = await axiod.get(
      'https://www.kingsoopers.com/search?query=' + search,
      {
        headers: {
          'Accept-enconding': 'application/gzip',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'}
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
    $(' .AutoGrid-cell.min-w-0 ').each((_: any, element: any) => {
    if (products.length >= 1) return false;
      const image = $(element).find('img.kds-Image-img').attr('src')!;
     // console.log("here");
      const link = $(element).find('a.kds-Link.kds-Link--inherit.kds-Link--implied.ProductDescription-truncated.overflow-hidden.text-primary').attr('href');
      const title = $(element).find('h3.kds-Text--l.text-primary.font-secondary.font-medium.my-8').text();
      const price = $(element)
        .find(
          'data.kds-Price.kds-Price--alternate[aria-label] > '
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
        platform: 'kingsoopers',
        title: title,
        price: price,
        image: image,
        link: 'https://www.kingsoopers.com'+ link,
        rating: rating,
        numReviews: numReviews
      };
      products.push(scraped);
    //  console.log(scraped);
    });
    
    return new Promise((resolve, _reject) => {
      resolve(products[0]);
    });

  } catch (error) {
    console.log('ERROR' + error);
  }
};

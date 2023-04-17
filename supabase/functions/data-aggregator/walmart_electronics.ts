import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

export const scrapeWalmart = async () => {
    try{
        const product = 'mouse';
        const brand = 'Logitech';
        const result = await axiod.get(
          'https://www.walmart.com/search?q=' +
            product +
            'facet=brand%3A' +
            brand + '',
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
        $('.mb0.ph1.pa0-xl.bb.b--near-white.w-25').each((_ : any, element : any) => {
            const image = $(element).find('img.absolute.top-0.left-0').attr('src')!;
            const link = $(element).find('a.absolute.w-100.h-100.z-1.hide-sibling-opacity').attr('href');
            const title = $(element).find('a.absolute.w-100.h-100.z-1.hide-sibling-opacity > span').text();
            const price = $(element).find('div.mr1.mr2-xl.b.black.green.lh-copy.f5.f4-l').text();
            const rating = $(element).find('div.flex.items-center.mt2 > span.w_iUH7').text().split(' ')[0];
            const numReviews = $(element).find('div.flex.items-center.mt2 > span[aria-hidden="true"]').text();

            products.push({
                platform: 'walmart',
                title,
                image,
                link: `https://walmart.com${link}`,
                price,
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

}
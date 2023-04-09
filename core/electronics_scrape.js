const axios = require('axios');
const cheerio = require('cheerio');
const { Queue, QueueScheduler} = require('bullmq');

const scrapeAmazon = async () => {
  try {
    const result = await axios.get(
      'https://www.amazon.com/s?k=' +
        product +
        '&rh=n%3A172282%2Cp_89%3A' +
        brand +
        '&dc&ds=v1%3AFUA1yqkcxwtsK0aIwNxdhCxqMEBa38xMZ36NHSDziUg&crid=1XT8C0G6X00TW&qid=1680129742&rnid=2528832011&sprefix=%2Caps%2C94&ref=sr_nr_p_89_1',
      {
        headers: {
          'Accept-enconding': 'application/gzip',
          'User-Agent': 'axios 1.3.4'
        }
      }
    );

    const html = result.data;
    const $ = cheerio.load(html);
    const products = [];
    $(
      'div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16'
    ).each((i, element) => {
      const title = $(element)
        .find('span.a-size-medium.a-color-base.a-text-normal')
        .text();
      const price = $(element).find('span.a-offscreen').text();
      const image = $(element).find('img.s-image').attr('src');
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
    return new Promise((resolve, reject) => {
      resolve(products);
    });
  } catch (error) {
    console.log(error);
  }
};

const scrapeBestBuy = async () => {
  try {
    const result = await axios.get(
      'https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=brand_facet%3DBrand~' +
        brand +
        '&st=' +
        mouse +
        '',
      {
        headers: {
          'Accept-enconding': 'application/gzip',
          'User-Agent': 'axios 1.3.4'
        }
      }
    );

    const html = result.data;
    const $ = cheerio.load(html);
    //console.log($.html());
    const products = [];
    $('ol.sku-item-list > li.sku-item').each((i, element) => {
      const image = $(element).find('img.product-image').attr('src');
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
    return new Promise((resolve, reject) => {
      resolve(products);
    });
  } catch (error) {
    console.log(error);
  }
};

new QueueScheduler('electronics');
const electronics = new Queue('electronics');

//Add output of scrapeAmazon to redis
const main = async () => {
  console.log('Adding job to queue');
  const amazonRes = await scrapeAmazon();
  const bestbuyRes = await scrapeBestBuy();
    await electronics.add(
        { amazonProducts: amazonRes, bestbuyProducts: bestbuyRes },
        (repeat = {
            cron: '*/5 * * * *',
            limit: 1
        })
    );
};


//main().catch(console.error);

// amazon.process(async (job, done) => {
//   // add amazonProducts to Postgres
//   console.log(job.data);

//   done();
// });

module.exports = {
  scrapeAmazon,
  scrapeBestBuy
};

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Database } from '../../../utils/database.types';
import { createClient } from '@supabase/supabase-js';
import { logger } from '../../../components/Logger';
import jwt from 'jsonwebtoken';

const updatePrice = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    logger.error('Invalid Method');
    res.status(405).json({ message: 'Invalid Method' });
    return;
  }

  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf('Bearer ') === -1
  ) {
    logger.error('Missing Authorization Header');
    res.status(401).json({ message: 'Missing Authorization Header' });
    return;
  }

  const base64Credentials = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(
    base64Credentials,
    process.env.JWT_SECRET!
  ) as jwt.JwtPayload;

  logger.debug(decodedToken);

  // verify auth token
  if (!decodedToken) {
    logger.error('Invalid Authorization Token');
    res.status(401).json({ message: 'Invalid Authorization Token' });
    return;
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  const { changed } = req.body;
  logger.info(changed);

  // create price type
  type Price = {
    price: string;
    product_id: string;
    platform: string;
    product_link: string;
    ratings: number;
    numReviews: number;
  };

  const changedArray: Price[] = changed;

  const reqs = changedArray.map(async priceJSON => {
    const acPrice = parseFloat(priceJSON.price);
    if (acPrice === 0) {
      logger.info('Price is 0');
      return;
    }
    const productID = parseInt(priceJSON.product_id);


    let acPlat;
    switch (true) {
      case priceJSON.platform.includes('best'):
        acPlat = 'bestbuy';
        break;
      case priceJSON.platform.includes('walmart'):
        acPlat = 'walmart';
        break;
      case priceJSON.platform.includes('king'):
        acPlat = 'kingsoopers';
        break;
      default:
        logger.error('no platform matched');
        res.status(500).json({ message: 'no platform matched' });
        return;
    }

    const { data: price, error } = await supabase
      .from('prices')
      .update({ price: acPrice })
      .eq('product_id', productID)
      .eq('platform', acPlat);

    if (error) {
      logger.error(error);
      return;
    }
  });

  return Promise.all(reqs).then(() => {
    logger.info('Success');
    res.status(200).json({ message: 'success' });
  });
};

export default updatePrice;

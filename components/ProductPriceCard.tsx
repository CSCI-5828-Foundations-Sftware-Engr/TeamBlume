import Link from 'next/link';
import { Button, Text } from '@nextui-org/react';
import { usePostHog } from 'posthog-js/react';
import {useRouter} from 'next/router'

const ProductPriceCard = ({name, price, rating, num_reviews, product_link, platform } : {name:string | undefined, price : string | undefined, rating : string | undefined, num_reviews : string | undefined, product_link : string | undefined, platform : string | undefined}) => {

  const posthog = usePostHog();
    const router = useRouter();

    function productPageVist() {
      posthog?.capture(
      'Product page visited',
      {
        name: name,
        store: platform
      })
    }

    function handleClick(){
      window.open(product_link || "", '_blank');
    }

  return (
    <div className="product-details card">
      <h3 className="platform">{platform}</h3>
      <h2>${price}</h2>
      {( rating ? 
        <div className="rating">
          <span>Rating : {rating}</span>
          <i className="fas fa-star"></i>
          <span>({num_reviews})</span>
        </div>
        : <></>)}
      <Button as='a' onPress={productPageVist} onClick={handleClick} auto>
              <Text h1 size="$3x1">Buy Now</Text>
      </Button>
    </div>
  );
};

export default ProductPriceCard;

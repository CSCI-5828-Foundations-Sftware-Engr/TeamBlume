import { Button, Text } from '@nextui-org/react';
import { usePostHog } from 'posthog-js/react';
import {useRouter} from 'next/router';


const ProductCard = ({imageSrc, brand, name, productId, categoryId } : {imageSrc : string | undefined, brand : string | undefined, name : string | undefined, productId : string | undefined, categoryId : string | undefined}) => {
    const posthog = usePostHog();
    const router = useRouter();

    function productVist() {
      posthog?.capture(
      'Product Visited',
      {
        name: name,
        brand: brand,
        category: categoryId
      })
    }

    function handleClick(){
      router.push({
            pathname: '/pacom/product',
            query: {
              catId: categoryId,
              prId: productId
            }
          });
    }

    return (
        <div className={'product-card'}>
          <img src={imageSrc} alt={name} />
          <div className={'product-details'}>
            <h3>{brand}</h3>
            <h2>{name}</h2>

            <Button as='a' onPress={productVist} onClick={handleClick} className='cat-product-button' auto>
              <Text h1 size="$3x1">View Product</Text>
            </Button>
          </div>
        </div>
      );
};

export default ProductCard;

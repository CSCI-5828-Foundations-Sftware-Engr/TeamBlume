import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { usePostHog } from 'posthog-js/react';


const ProductCard = ({ imageSrc, brand, name, productLink } : {imageSrc : string | undefined, brand : string | undefined, name : string | undefined, productLink : string}) => {
    const posthog = usePostHog()

    function productVist() {
      posthog.capture(
      'Product Visited',
      {
        name: name,
        brand: brand
      })
    }

    return (
        <div className={'product-card'}>
          <img src={imageSrc} alt={name} />
          <div className={'product-details'}>
            <h3>{brand}</h3>
            <h2>{name}</h2>
            <Link href={productLink}>
              View Product
            </Link>
//             <Button as='a' onPress={productVist} href={productLink}>
//                 View Product
//             </Button>
          </div>
        </div>
      );
};

export default ProductCard;

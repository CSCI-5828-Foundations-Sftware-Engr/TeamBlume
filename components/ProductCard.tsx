import Link from 'next/link';
import { Button, Text } from '@nextui-org/react';
import { usePostHog } from 'posthog-js/react';
import Image from 'next/image';

const ProductCard = ({
  imageSrc,
  brand,
  name,
  productLink
}: {
  imageSrc: string;
  brand: string | undefined;
  name: string | undefined;
  productLink: string;
}) => {
  const posthog = usePostHog();

  function productVist() {
    posthog?.capture('Product Visited', {
      name: name,
      brand: brand
    });
  }

  return (
    <div className={'product-card'}>
      <Image src={imageSrc} width={300} height={300} alt={name} />
      <div className={'product-details'}>
        <h3>{brand}</h3>
        <h2>{name}</h2>

        <Button as="a" onPress={productVist} href={productLink} auto>
          <Text h1 size="$3x1">
            View Product
          </Text>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

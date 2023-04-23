import Link from 'next/link';

const ProductCard = ({ imageSrc, brand, name, productLink } : {imageSrc : string | undefined, brand : string | undefined, name : string | undefined, productLink : string}) => {
    return (
        <div className={'product-card'}>
          <img src={imageSrc} alt={name} />
          <div className={'product-details'}>
            <h3>{brand}</h3>
            <h2>{name}</h2>
            <Link href={productLink}>
              <a>View Product</a>
            </Link>
          </div>
        </div>
      );
};

export default ProductCard;
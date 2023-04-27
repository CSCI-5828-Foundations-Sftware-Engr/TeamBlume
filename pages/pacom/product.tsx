import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react';

import ProductPriceCard from '../../components/ProductPriceCard';

import Head from 'next/head';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import {Loading} from '@nextui-org/react';


import {useSession} from '@supabase/auth-helpers-react';

const Product = () => {

    const sessionVar = useSession();

    const [session, setSession] = useState(useSession());
    const router = useRouter()
    const queryObj = router.query;

    const [product, setProduct] = useState < datObj > ({});
    const [productPrices, setProductPrices] = useState < priceObj[] > ([]);

    if (session != sessionVar) {
        setSession(sessionVar);
    }

    type priceObj = {
        price?: number;
        rating?: number;
        num_reviews?: number;
        product_link?: string;
        platform?: string;
    };


    type datObj = {
        product_name?: string;
        img_link?: string;
        brand?: string;
    };

    const catItem : datObj = React.useMemo(() => ({}), [] );
    const priceItmes : priceObj[] = React.useMemo(() => [], [] );

    useEffect(() => {


        if (queryObj != undefined && priceItmes.length == 0) {
            fetch(`/api/catProduct/${queryObj.catId}+${queryObj.prId}` ).then(response => response.json()).then(json => {

                if (json.products) {
                    for (let i = 0; i < json.products.length; i++) {
                        catItem.product_name = (json.products[i].product_name ?. toString());
                        catItem.brand = (json.products[i].brand);
                        catItem.img_link = (json.products[i].image_link);
                    }
                    setProduct(catItem);
                }

            }).catch(error => console.error(error));

            fetch('/api/price/' + queryObj.prId).then(response => response.json()).then(json => {

                if (json.prices) {
                    for (let i = 0; i < json.prices.length; i++) {
                        priceItmes.push({
                            price: json.prices[i].price ?. toString(),
                            rating: json.prices[i].rating,
                            num_reviews: json.prices[i].num_reviews,
                            product_link: json.prices[i].product_link,
                            platform: json.prices[i].platform
                        });
                    }
                    setProductPrices(priceItmes);
                }

            }).catch(error => console.error(error));
        }

        if (!session) {
            router.push("/");
        }

    }, [queryObj, router, session, catItem, priceItmes]);



    return (
        <>
            <Head>
                <title>PACom</title>
                <meta name="description" content="Price comparison and aggregator"/>
            </Head>
            {session ? <Header session={session}/> : <Header session={null}/>}
            <div className={'content-container'}>
                <div className="content">
                    <div className="">
                        <div className="product-detail-grid">
                            <h2 className="product-detail-title">{product.product_name}</h2>
                            <div className="product-detail-info">
                                <div className="product-detail-brand">
                                    <p>{product.brand}</p>
                                </div>
                            </div>  
                            <div className="product-detail-img">
                                <img src={product.img_link} alt={product.product_name}/>
                            </div>
                        </div>
                        <div className="product-page-grid">
                            {
                            (productPrices.length > 0 ? <> {
                                productPrices.map((item, index) => (
                                    <>
                                    <div key={index}
                                        className="flex flex-row">
                                            <ProductPriceCard key={index}
                                                name={product.product_name}
                                                price={item.price?.toString()}
                                                rating={item.rating?.toString()}
                                                num_reviews={item.num_reviews?.toString()}
                                                product_link={item.product_link}
                                                platform={item.platform}/>
                                    </div>
                                    </>
                                ))
                            } </> : <>
                                <div className="flex flex-center">
                                    <Loading/>
                                </div>
                            </>)
                        } 
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );

}

export default Product;

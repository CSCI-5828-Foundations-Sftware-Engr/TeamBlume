import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react';

import ProductCard from '../../components/ProductCard';
import LineChart from '../../components/LineChart';

import { Button, Text } from '@nextui-org/react';
import Head from 'next/head';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import {Loading} from '@nextui-org/react';


import {useSession} from '@supabase/auth-helpers-react';

const Products = () => {

    const sessionVar = useSession();

    const [session, setSession] = useState(useSession());
    const router = useRouter()
    const queryObj = router.query;

    const [data, setData] = useState(null);
    const [products, setProducts] = useState < datObj[] > ([]);

    if (session != sessionVar) {
        setSession(sessionVar);
    }

    type datObj = {
        product_name?: string;
        img_link?: string;
        product_id?: number;
        platform?: string;
        brand?: string;
    };

    const catItems : datObj[] = React.useMemo(() => [], [] );

    useEffect(() => {


        if (products.length == 0 && queryObj != undefined) {
            fetch('/api/product/' + queryObj.catId).then(response => response.json()).then(json => {
                setData(json);

                if (json.products) {
                    for (let i = 0; i < json.products.length; i++) {
                        catItems.push({
                            product_name: json.products[i].product_name ?. toString(),
                            brand: json.products[i].brand,
                            img_link: json.products[i].image_link,
                            platform: json.products[i].platform,
                            product_id: json.products[i].id
                        });
                    }
                    setProducts(catItems);
                }
            }).catch(error => console.error(error));
        }

        if (!session) {
            router.push("/");
        }

    }, [queryObj, router, session, catItems]);

    return (
        <>
            <Head>
                <title>PACom</title>
                <meta name="description" content="Price comparison and aggregator"/>
            </Head>
            {
                session ? <Header session={session}/> : <></>
            }
            <div className={'content-container'}
                // style={
                //     {padding: '50px 0 100px 0'}
                // }
            >
                <div className="content">
                    <div className="">
                        <div className="product-grid">
                            {
                            (products.length > 0 ? <> {
                                products.map((item, index) => (
                                    <div key={index}
                                        className="flex flex-row">
                                        <ProductCard imageSrc={
                                                item.img_link ?. toString()
                                            }
                                            brand={
                                                item.brand ?. toString()
                                            }
                                            name={
                                                item.product_name ?. toString()
                                            }
                                            productId={
                                                item.product_id ?. toString()
                                            }
                                            categoryId={
                                                queryObj.catId ?. toString()
                                            }
                                            />
                                    </div>
                                ))
                            } </> : <>
                                <div className="flex flex-center">
                                    <Loading/>
                                </div>
                            </>)
                        } </div>
                    </div>
                    <div className="flex-end flex"></div>
                    {/* <div>
                      <LineChart />
                    </div> */}
                </div>
            </div>
            <Footer/>
        </>
    );

}

export default Products;

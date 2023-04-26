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

    type dataObj = {
        id?: number;
        product_name?: string;
        inserted_at?: string;
        updated_at?: string;
        image_link?: string;
        product_link?: string;
        platform?: string;
        brand?: string;
        category_id?: number;
    };


    type datObj = {
        product_name?: string;
        img_link?: string;
        product_link?: string;
        platform?: string;
        brand?: string;
    };

    const catItems : datObj[] = React.useMemo(() => [], [] );
    // let catItems: datObj[] = [];

    useEffect(() => {


        if (queryObj != undefined) {
            fetch('/api/product/' + queryObj.catId).then(response => response.json()).then(json => {
                setData(json);
                // populateData(json.products);

                if (json.products) {
                    for (let i = 0; i < json.products.length; i++) {
                        console.log(json.products[i].product_name);
                        catItems.push({
                            product_name: json.products[i].product_name ?. toString(),
                            brand: json.products[i].brand,
                            img_link: json.products[i].image_link,
                            product_link: json.products[i].product_link,
                            platform: json.products[i].platform
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

// Need product_id and subcategory (Mouse/Keyboard)
    // function populateData(data : dataObj[]) {
    //     if (data) {
    //         for (let i = 0; i < data.length; i++) {
    //             console.log(data[i].product_name);
    //             catItems.push({
    //                 product_name: data[i].product_name ?. toString(),
    //                 brand: data[i].brand,
    //                 img_link: data[i].image_link,
    //                 product_link: data[i].product_link,
    //                 platform: data[i].platform
    //             });
    //         }
    //         setProducts(catItems);
    //     }
    // }



    return (
        <>
            <Head>
                <title>PACom</title>
                <meta name="description" content="Price comparison and aggregator"/>
            </Head>
            <div className={'content-container'}
                style={
                    {padding: '50px 0 100px 0'}
            }>
                {
                session ? <Header session={session}/> : <></>
            }
                <div className="content">
                    <div className="">
                        <h3>{queryObj.catId == "1" ? "Electronics" : "Grocery"}</h3>
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
                                            productLink={
                                                item.product_link ?. toString() || "#"
                                            }/>
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
                    <div>
                      <LineChart />
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );

}

export default Products;

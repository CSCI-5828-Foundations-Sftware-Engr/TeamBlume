import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default () => {
  const router = useRouter()
  const queryObj = router.query;

  const [data, setData] = useState(null);
  const [products, setProducts] = useState<datObj[]>([]);


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

  let catItems : datObj[] = [];

  useEffect(() => {
    if(queryObj!=undefined){
    fetch('/api/product/'+queryObj.keyword)
      .then(response => response.json())
      .then(json => 
        {
            setData(json); 
            populateData(json.products);
        })
      .catch(error => console.error(error));
    }
  }, [queryObj]);


  function populateData(data:dataObj[]) {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].product_name);
        catItems.push({ product_name: data[i].product_name?.toString(), brand: data[i].brand, img_link: data[i].image_link, product_link: data[i].product_link, platform: data[i].platform });
      }
      setProducts(catItems);
      // console.log(products);
      console.log(catItems);
    } 
  }


  return (
    <div className="content">
      <div className=""></div>
      <div className="">
        {(products.length > 0 ? <>
          {products.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <img src={item.img_link} className="w-32 h-32"/>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">{item.product_name}</span>
                  <span className="text-sm">{item.brand}</span>
                  <span className="text-sm">{item.platform}</span>
                </div>
              </div>
            </div>
          ))}
        </> 
        : 
        <>
          <div className="flex flex-col">
            No Products
          </div>
        </>)}
      </div>
      <div className="flex-end flex"></div>
    </div>
  );

}
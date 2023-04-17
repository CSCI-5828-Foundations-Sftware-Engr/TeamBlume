// import type { NextPage } from 'next';
// import Head from 'next/head';
// import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
// import Footer from './Footer';
// import Header from './Header';
// import Home from '../pages/index';

// import React from "react";
// import { Dropdown } from "@nextui-org/react";

// const Main: NextPage = () => {
//     const session = useSession();

//     const menuItems = [
//       { key: "electronics", name: "Electronics" },
//       { key: "groceries", name: "Groceries" },
//     ];

//     const [selected, setSelected] = React.useState(new Set(["Select a Category"]));

//     const selectedValue = React.useMemo(
//       () => Array.from(selected).join(", ").replaceAll("_", " "),
//       [selected]
//     );



//     return (
//       <div>
//         <Head>
//           <title>PACom Home</title>
//           <meta name="description" content="Price comparison and aggregator" />
//         </Head>
//         <Header />
//         <div className="content-container">
//           {session ? (
//             <div className="row">
//               <div className="col-12">
//                 <p className="top-content">
//                   Welcome to Price comparison and aggregator service. Here you
//                   will find prices of different products from different sources
//                   and compare them to find the best price.
//                   <br />
//                   <br />
//                   Select from the below options to start comparing prices
//                 </p>

//                 <div className="dropdown-category selector">
//                 <Dropdown>
//                   <Dropdown.Button flat>{selectedValue}</Dropdown.Button>
//                   <Dropdown.Menu aria-label="Dynamic Actions" items={menuItems} selectionMode="single" 
//                   selectedKeys={selected} onSelectionChange={setSelected}>
//                     {(item) => (
//                       <Dropdown.Item
//                         key={item.key}
//                         color={item.key === "delete" ? "error" : "default"}
//                       >
//                         {item.name}
//                       </Dropdown.Item>
//                     )}
//                   </Dropdown.Menu>
//                 </Dropdown>

//                 </div>
                
//               </div>
//             </div>
//           ) : (
//               <Home />        
//           )}
  
//           <Footer />
//         </div>
//       </div>
//     );
//   };
  
//   export default Main;
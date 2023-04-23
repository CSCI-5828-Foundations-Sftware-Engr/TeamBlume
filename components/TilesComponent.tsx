// import React from 'react';
// import { Card, Grid, Row, Text } from '@nextui-org/react';
// import Router from 'next/router';

// type ddItemObj = {
//   key?: string;
//   name?: string;
// };

// export const TilesComponent = ({
//   ddType,
//   ddItems
// }: {
//   ddType: string;
//   ddItems: { key: string; name: string }[];
// }) => {

//   const [selected, setSelected] = React.useState(new Set([ddItems[0].key]));

//   const selectedValue = React.useMemo(
//     () => Array.from(selected).join(', ').replaceAll('_', ' '),
//     [selected]
//   );

//   function handleSelected(e: string | Set<React.Key>) {
//     setSelected(e as Set<string>);
//   }

//   function redirectToCompare(opVal: string){
//       Router.push({
//         pathname: '/pacom/compare',
//         query: { catId: opVal }
//       });
//   }

//   const cName = ddType + ' card-selection';
//   const iId = ddType + '-value';

//   return (
//     <div className="card-selector" id="card-selector">
//       <Grid.Container gap={2}>
//         <Grid sm={12} md={5}>
//           <Card
//              isPressable
//              isHoverable
//              onPress={() => {
//                              redirectToCompare(
//                                {selectedValue}
//                              );
//                            }}
//           >
//             <Card.Image
//               src = {"/images/electronics.png"}
//               objectFit="cover"
//               width={300}
//               height={300}
//               alt="Electronics"
//             />
//             <Card.Footer>
//               <Text h2 >Electronics</Text>
//             </Card.Footer>
//           </Card>
//          </Grid>
//          {"                                                       "}
//          <Grid sm={12} md={5}>
//           <Card
//             isPressable
//             isHoverable
//             onPress={() => {
//                             redirectToCompare(
//                               {selectedValue}
//                             );
//                           }}
//           >
//             <Card.Image
//               src = {"/images/grocery.png"}
//               objectFit=""
//               width={300}
//               height={300}
//               alt="Groceries"
//             />
//             <Card.Footer>
//               <Text h2>Groceries</Text>
//             </Card.Footer>
//           </Card>
//          </Grid>
//         </Grid.Container>
//       <input type="hidden" id={iId} value={selectedValue} />
//     </div>
//   );
// };

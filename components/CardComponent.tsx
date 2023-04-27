import React from 'react';
import Router from 'next/router';

import { Card, Grid, Text, Spacer } from '@nextui-org/react';

export const CardComponent = ({
  index,
  id,
  name
}: {
  index: number;
  id: number;
  name: string;
}) => {
    return(
        <div key={index} className="flex flex-row card-cat-component">
            <Spacer x={7} />
            <Grid>
                <Card isPressable isHoverable
                onPress={
                    () => {
                    Router.push({
                        pathname: '/pacom/products',
                        query: {
                        catId: id
                        }
                    });
                    }
                }>
                <Card.Image
                    src = {"/images/"+name.toLowerCase()+".png"}
                    objectFit="cover"
                    width="fit-content"
                    height={300}
                    alt={name}
                    />
                <Card.Footer>
                    <Text h1 className="primary-cat-name">{name}</Text>
                </Card.Footer>
                </Card>
            </Grid>
            </div>
    );
}

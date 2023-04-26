import React from 'react';
import Router from 'next/router';

import { Card, Grid, Text } from '@nextui-org/react';

export const CardComponent = ({index, id, name} : {index:number, id: number, name: string}) => {   

    return(
        <div key={index} className="flex flex-row">

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
                    src = {"/images/"+name+".png"}
                    objectFit="cover"
                    width="fit-content"
                    height={200}
                    alt={name}
                    />
                <Card.Footer>
                    <Text h2>{name}</Text>
                </Card.Footer>
                </Card>
            </Grid>
            </div>
    );
}
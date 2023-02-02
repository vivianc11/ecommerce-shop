import React from "react";
import { Grid } from "@material-ui/core";


const products = [
    {id: 1, name: 'Shoes', description: 'Running shoes'},
    {id: 2, name: 'Macbook', description: 'Apple Macbook'},
];

const Products = () => {
    <main>
        <Grid container justifyContent="center" spacing={4}>
            {products.map((product) => (
                // Every time you're looping through something in jsx, you need to have an id
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}> 
                    <Product />
                </Grid>
            ))}
        </Grid>
    </main>
}

export default Products;
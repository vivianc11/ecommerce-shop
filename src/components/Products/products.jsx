import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";

const products = [
    {id: 1, name: 'Shoes', description: 'Running shoes', price: '$60'},
    {id: 2, name: 'Macbook', description: 'Apple Macbook', price: '$800'},
];

const Products = () => {

    return (
        <main>
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    // Every time you're looping through something in jsx, you need to have an id
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}> 
                        {/* Passing each product as a prop */}
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;
import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";
import useStyles from './style';

const products = [
    {id: 1, name: 'Shoes', description: 'Running shoes', price: '$60'},
    {id: 2, name: 'Macbook', description: 'Apple Macbook', price: '$800'},
];

const Products = () => {

    const classes = useStyles();

    return (
        <main className={classes.content}>
            {/* Adding the exact height of the Navbar so our product content gets pushed a little but below and don't get covered up by Navbar */}
            <div className={classes.toolbar} />
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
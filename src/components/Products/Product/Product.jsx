import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product }) => {
    const classes = useStyles();


    return (
    // Will have the layout for a product
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={product.image.url} title={product.name} />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="h5">
                    {product.price.formatted_with_code}
                </Typography>
            </div>
            {/* The product.description by itself comes back with html <p> tags, so in order to render the description as html, we need the dangerouslySetInnerHTML */}
            <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton area-label="Add to Cart">
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product;
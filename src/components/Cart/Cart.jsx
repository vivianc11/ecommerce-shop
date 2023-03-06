import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    // when the cart is empty
    const EmptyCart = () => (
        <Typography variant='subtitle1'>
            You have no items added into your shopping cart!
            <Link to='/' className={classes.link}> Start adding items</Link>
        </Typography>
    )

    // when the cart is filled
    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {/* mapping through the items in the cart */}
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id} >
                    <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant='h4'>
                Subtotal: {cart.subtotal.formatted_with_code}
            </Typography>
            <div>
                <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>Empty Cart</Button>
                <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>Check Out</Button>
            </div>
        </div>
        </>
    )

    // waiting for the line_items to be fetched from the API otherwise, it would error out
    if(!cart.line_items) return 'Loading...';

  return (
    <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
        { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
    </Container>
  )
}

export default Cart;
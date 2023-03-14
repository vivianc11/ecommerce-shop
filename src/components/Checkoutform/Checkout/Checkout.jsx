import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';


const steps = ['Shipping Address', 'Payment Details']
const Checkout = ({ cart }) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setcheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                console.log(token);

                setcheckoutToken(token);

            } catch (error) {

            }
        }

        generateToken();
    },[cart])

    // adjusting the activeStep
    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1);
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);

    // handling submitting the addressForm
    const next = (data) => {
        setShippingData(data);

        nextStep();
    }

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    );

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm />

  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            {/* section that displays the steps for entering the shipping address and then payment details */}
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper} >
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {/* if the active step is on the last step, then show the confirmation componenent */}
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
            </Paper>

        </main>
    </>
  )
}

export default Checkout;
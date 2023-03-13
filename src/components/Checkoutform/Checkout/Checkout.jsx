import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';


const steps = ['Shipping Address', 'Payment Details']
const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    );

    const Form = () => activeStep === 0 ? <AddressForm /> : <PaymentForm />

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
                {activeStep === steps.length ? <Confirmation /> : <Form /> }
            </Paper>

        </main>
    </>
  )
}

export default Checkout;
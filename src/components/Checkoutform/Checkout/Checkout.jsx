import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { SettingsBackupRestoreSharp } from '@material-ui/icons';


const steps = ['Shipping Address', 'Payment Details']
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setcheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                // console.log(token);

                setcheckoutToken(token);

            } catch (error) {
                console.log(error)
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

    // displaying the confirmation page after finishing payment
    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase, firstName lastName!</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>Order ref: ref</Typography>
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if (error) {
        <>
        <Typography variant='h5'>Error: {error} </Typography>
        <br />
        <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next} /> 
    : <PaymentForm checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout}/>

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
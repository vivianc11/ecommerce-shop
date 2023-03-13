import React, { useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';

import { commerce } from '../../lib/commerce';

const AddressForm = () => {
    const methods = useForm();
    const [shippingCountries, setshippingCountries] = useState([]);
    const [shippingCountry, setshippingCountry] = useState('');
    const [shippingSubdivisions, setshippingSubdivisions] = useState([]);
    const [shippingSubdivision, setshippingSubdivision] = useState('');
    const [shippingOptions, setshippingOptions] = useState([]);
    const [shippingOption, setshippingOption] = useState('');

    const fetchShippingCountries = async(checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setshippingCountries(countries);
    }


  return (
    <>
        <Typography variant='h6' gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit=''>
                <Grid container spacing={3}>
                    <Grid item xs={6}><FormInput required name='firstName' label='First Name' /></Grid>
                    <Grid item xs={6}><FormInput required name='lastName' label='Last Name' /></Grid>
                    <Grid item xs={6}><FormInput required name='address1' label='Address' /></Grid>
                    <Grid item xs={6}><FormInput required name='email' label='Email' /></Grid>
                    <Grid item xs={6}><FormInput required name='city' label='City' /></Grid>
                    <Grid item xs={6}><FormInput required name='zip' label='Zip/Postal Code' /></Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivisions</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me
                            </MenuItem>
                        </Select>
                    </Grid> */}
                </Grid>
            </form>
        </FormProvider>
    </>
  )
}

export default AddressForm;
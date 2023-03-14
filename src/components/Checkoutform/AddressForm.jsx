import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';
import useStyles from './styles'

import { commerce } from '../../lib/commerce';

const AddressForm = ({ checkoutToken, next }) => {
    const classes = useStyles();

    const methods = useForm();
    const [shippingCountries, setshippingCountries] = useState([]);
    const [shippingCountry, setshippingCountry] = useState('');
    const [shippingSubdivisions, setshippingSubdivisions] = useState([]);
    const [shippingSubdivision, setshippingSubdivision] = useState('');
    const [shippingOptions, setshippingOptions] = useState([]);
    const [shippingOption, setshippingOption] = useState('');

    // fetching the available shipping countries
    const fetchShippingCountries = async(checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        // console.log(countries);
        setshippingCountries(countries);
        setshippingCountry(Object.keys(countries)[0]);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    // converting an object into an array of arrays so we can loop over it
    // mapping over it so it's just one array with objects that gives an id with country code and lable with country name
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));

    // fetching the subdivions based on the picked country
    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        // console.log(subdivisions);
        setshippingSubdivisions(subdivisions);
        setshippingSubdivision(Object.keys(subdivisions)[0]);
    }
    
    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry])

    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));

    //fetching shipping options
    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })

        setshippingOptions(options);
        // already an array
        setshippingOption(options[0].id);
    }

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_code})`}))


  return (
    <>
        <Typography variant='h6' gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => next({ ... data, shippingCountry, shippingSubdivision, shippingOption }))}>
                <Grid container spacing={3}>
                    <Grid item xs={6} className={classes.inputs}><FormInput name='firstName' label='First Name' /></Grid>
                    <Grid item xs={6} className={classes.inputs}><FormInput name='lastName' label='Last Name' /></Grid>
                    <Grid item xs={6} className={classes.inputs}><FormInput name='address1' label='Address' /></Grid>
                    <Grid item xs={6} className={classes.inputs}><FormInput name='email' label='Email' /></Grid>
                    <Grid item xs={6} className={classes.inputs}><FormInput name='city' label='City' /></Grid>
                    <Grid item xs={6} className={classes.inputs}><FormInput name='zip' label='Zip/Postal Code' /></Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setshippingCountry(e.target.value)}>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivisions</InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={(e) => setshippingSubdivision(e.target.value)}>
                            {subdivisions.map((subdivision) => (
                                <MenuItem key={subdivision.id} value={subdivision.id}>
                                    {subdivision.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setshippingOption(e.target.value)}>
                            {options.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                    <Button type='submit' variant='contained' color='primary'>Next</Button>
                </div>
            </form>
        </FormProvider>
    </>
  )
}

export default AddressForm;
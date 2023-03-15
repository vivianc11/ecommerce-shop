import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label }) => {

    const { control } = useFormContext();

  return (
    <div>
        <Grid item xs={12} sm={6}>
            <Controller 
                as={TextField}
                name={name}
                label={label}
                control={control}
                defaultValue=''
                fullWidth
                required
            />
        </Grid>
    </div>
  )
}

export default FormInput;
import { Grid, TextField } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const AdressInput = ({ name, required, label }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={6} sm={12}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            onChange={onChange}
            onBlur={onBlur}
            fullWidth
            value={value}
            label={label}
            required={required}
          />
        )}
      />
    </Grid>
  );
};

export default AdressInput;

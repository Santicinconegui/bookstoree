import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import AdressInput from "./AdressInput";
import { actionTypes } from "../Reducer";
import { useDispatch } from "react-redux";

export default function AddressForm({ nextStep }) {
  const methods = useForm(); //captura datos del furmulario
  const dispatch = useDispatch();

  return (
    //AdressInput componente que recibe atributos que son capturados por el formProvider
    <>
      <Typography variant="h6" gutterBottom>
        Shipping adress
      </Typography>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            console.log(data);
            dispatch({
              type: actionTypes.SET_SHIPPINGDATA,
              shippingData: data,
            });
            nextStep();
          })}>
          <Grid container spacing={3}>
            <AdressInput required name="firstName" label="First Name" />
            <AdressInput required name="LastName" label="Last Name" />
            <AdressInput required name="adress1" label="Adress" />
            <AdressInput required name="email" label="Email" />
            <AdressInput required name="city" label="City" />
            <AdressInput required name="postCode" label="Post Code" />
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}>
            <Button component={Link} to="/cart">
              Back to checkout page
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

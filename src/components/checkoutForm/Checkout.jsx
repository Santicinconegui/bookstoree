import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AdressForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { useStateValue } from "../../context/StateProvider";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        <span> BOOK | STORE </span>
      </Link>
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details"];
const theme = createTheme();
export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const [{ paymentMessage }, dispatch] = useStateValue();

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm nextStep={nextStep} />
    ) : (
      <PaymentForm backStep={backStep} nextStep={nextStep} />
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation message={paymentMessage} />
          ) : (
            <Form />
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

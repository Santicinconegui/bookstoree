import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Confimation = ({ message }) => {
  let numbers = "0123456789";
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYS";
  let all = numbers + letters;

  const codeReference = (length) => {
    let password = "";
    for (let x = 0; x < length; x++) {
      let random = Math.floor(Math.random() * all.length);
      password += all.charAt(random);
    }
    return password;
  };

  return (
    <>
      <div className="container d-flex justify-content-center p-4">
        <h5>{message}!</h5>
      </div>
      <hr />

      <div className="container d-flex justify-content-center">
        <h6>
          {message === "succesful payment"
            ? `Your code of reference: 
            
            ${codeReference(10)} `
            : ""}
        </h6>
      </div>
      <div className="container d-flex justify-content-center p-2">
        <Button component={Link} to="/">
          Back to home
        </Button>
      </div>
    </>
  );
};

export default Confimation;

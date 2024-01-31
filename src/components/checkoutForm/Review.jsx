import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Review = () => {
  const cart = useSelector((state) => state);
  const total = cart.reduce(
    (acc, book) => (acc += Number(parseInt(book.price.slice(1))) * book.qty),
    0
  );

  return (
    <>
      <div className="container ">
        <Typography variant="h6" gutterBottom>
          Orden Summary
        </Typography>
        <List disablePadding>
          {cart?.map((book) => (
            <ListItem key={book.title}>
              <ListItemText primary={book.title} secondary={`x ${book.qty}`} />
              <Typography variant="body2">
                ${Number(parseInt(book.price.slice(1)))}
              </Typography>
            </ListItem>
          ))}
          <ListItem>
            <ListItemText primary="TOTAL :" />
            <Typography variant="subtitle1">$ {total}</Typography>
          </ListItem>
        </List>
      </div>
    </>
  );
};

export default Review;

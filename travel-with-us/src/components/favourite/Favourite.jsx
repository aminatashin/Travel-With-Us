import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import usestyles from "./styles";

import { useSelector } from "react-redux";
const Favourite = () => {
  const placeFavorite = useSelector((state) => state.place.favorite);
  const classes = usestyles();
  return (
    <Card elevation={6} style={{ cursor: "pointer" }}>
      <CardMedia
        style={{ height: 350 }}
        image={
          placeFavorite.photo
            ? placeFavorite.photo.images.large.url
            : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwcmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
        }
        title={placeFavorite.name}
      />
      <CardContent>
        <Typography gutterBottom veriant="h5">
          {placeFavorite.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(placeFavorite.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {placeFavorite.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price Level</Typography>
          <Typography gutterBottom variant="subtitle1">
            {placeFavorite.price_level
              ? placeFavorite.price_level
              : "Not written"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle2">
            {placeFavorite.ranking ? placeFavorite.ranking : "Not written"}
          </Typography>
        </Box>
        {placeFavorite?.awards?.map((award) => (
          <Box
            my={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <image src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {placeFavorite?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {placeFavorite?.address && (
          <Typography
            gutterBottom
            veriant="subtitle2"
            className={classes.subtitle}
            color="textSecondary"
            justifyContent="space-between"
          >
            <LocationOnIcon /> {placeFavorite.address}
          </Typography>
        )}
        {placeFavorite?.phone && (
          <Typography
            gutterBottom
            veriant="subtitle2"
            className={classes.spacing}
            color="textSecondary"
            justifyContent="space-between"
          >
            <PhoneIcon /> {placeFavorite.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(placeFavorite.web_url)}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(placeFavorite.website)}
          >
            website
          </Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Favourite;

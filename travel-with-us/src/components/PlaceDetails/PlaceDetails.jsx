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

const PlaceDetails = ({
  place,
  selected,
  refProp,
  changePlace,
  selectedPlace,
}) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const [fav, setFav] = useState({
    location: "",
  });
  const classes = usestyles();

  const handleFetch = async () => {
    fetchPost();
  };
  // =========FetchPost=============================
  const fetchPost = async () => {
    const res = await fetch("http://localhost:4000/user/place", {
      method: "post",
      body: JSON.stringify(place.location_id),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("successfully added the Place!");
    }
  };

  return (
    <Card
      elevation={6}
      className={selectedPlace?.id === place.id ? "red" : "white"}
      onClick={() => changePlace(place)}
      style={{ cursor: "pointer" }}
    >
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwcmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom veriant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price Level</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level ? place.price_level : "Not written"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle2">
            {place.ranking ? place.ranking : "Not written"}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
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
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography
            gutterBottom
            veriant="subtitle2"
            className={classes.subtitle}
            color="textSecondary"
            justifyContent="space-between"
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            veriant="subtitle2"
            className={classes.spacing}
            color="textSecondary"
            justifyContent="space-between"
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url)}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website)}
          >
            website
          </Button>
          <Button onClick={handleFetch} size="small" color="primary">
            Favourite
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
//

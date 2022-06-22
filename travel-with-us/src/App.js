import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

function App() {
  // ======================================
  const [palces, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [childClick, setChildClick] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ======================================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  // ======================================
  useEffect(() => {
    setIsLoading(true);
    fetchApi(type).then((data) => {
      setPlaces(data.data);
      setIsLoading(false);
    });
  }, [type, coordinates, bounds]);
  // ======================================
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchApi();
  //   setIsLoading(false);
  // }, [coordinates, bounds]);
  // ======================================
  const fetchApi = async () => {
    try {
      const res = await fetch(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=11.847676&tr_latitude=12.838442&bl_longitude=109.095887&tr_longitude=109.149359&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=30&currency=USD&open_now=false&lunit=km&lang=en_US`,

        {
          headers: {
            "X-RapidAPI-Key":
              "82e39a69f3msh5cb29321d7c6cc9p1efe1ejsn9f1e5b6e0bcd",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={palces}
            childClick={childClick}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={palces}
            setChildClick={setChildClick}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;

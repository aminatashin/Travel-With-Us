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
  const [placesFilter, setPlaceFilter] = useState([]);
  const [rating, setRating] = useState("");
  const [childClick, setChildClick] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState([]);

  // ======================================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  // =====================================
  useEffect(() => {
    const placesFilter = palces.filter((place) => place.rating > rating);
    setPlaceFilter(placesFilter);
  }, [rating, palces]);
  // ======================================
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      fetchApi(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(
          data.data?.filter((place) => place.name && place.num_reviews > 0)
        );
        setPlaceFilter([]);
      });
    }
  }, [type, bounds]);
  // ======================================
  // weatherFetch(coordinates.lat, coordinates.lng).then((data) => {
  //   setWeather(data.coord);
  // });
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchApi();
  //   setIsLoading(false);
  // }, [type, bounds]);
  // ======================================

  const fetchApi = async (type, sw, ne) => {
    try {
      const res = await fetch(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${sw.lat}&tr_latitude=${ne.lat}&bl_longitude=${sw.lng}&tr_longitude=${ne.lng}`,

        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_TRAVEL_API_KEY,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setPlaces(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ============================================
  // const weatherFetch = async (lat, lng) => {
  //   const res = await fetch(
  //     `https://community-open-weather-map.p.rapidapi.com/weather?lat=${lat}&lon=${lng}`,
  //     {
  //       headers: {
  //         "X-RapidAPI-Key": process.env.RAPID_WEATHER_API_KEY,
  //         "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
  //       },
  //     }
  //   );
  //   if (res.ok) {
  //     const data = await res.json();
  //     console.log(data);
  //     setWeather(data.coord);
  //   }
  // };

  return (
    <>
      <CssBaseline />
      <Header setChildClick={setChildClick} setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={placesFilter.length ? placesFilter : palces}
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
            places={placesFilter.length ? placesFilter : palces}
            setChildClick={setChildClick}
            weather={weather}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;

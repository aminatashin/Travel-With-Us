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
  const [autocomplete, setAutocomplete] = useState(null);

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
  }, [rating]);
  // ======================================
  useEffect(() => {
    setIsLoading(true);
    fetchApi(type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(
        data.data?.filter((place) => place.name && place.num_reviews > 0)
      );
      setPlaceFilter([]);
      setIsLoading(false);
    });
  }, [type, bounds]);
  // ======================================
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchApi();
  //   setIsLoading(false);
  // }, [coordinates, bounds]);
  // ======================================
  const fetchApi = async (type, sw, ne) => {
    try {
      const res = await fetch(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${sw.lat}&tr_latitude=${ne.lat}&bl_longitude=${sw.lng}&tr_longitude=${ne.lng}`,

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
  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setChildClick({ lat, lng });
  };
  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
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
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;

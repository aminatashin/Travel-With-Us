import React, { useState, useEffect } from "react";
import { getPlacesData } from "../src/Api/api";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

function App() {
  // ======================================
  const [palces, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [query, setQuery] = useState({
    bl_latitude: "",
    tr_latitude: "",
    bl_longitude: "",
    tr_longitude: "",
  });

  // ======================================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  // ======================================
  // useEffect(() => {
  //   getPlacesData(bounds.sw,bounds.ne).then((data) => {
  //     console.log(data);
  //     setPlaces(data);
  //   });
  // }, [coordinates, bounds]);
  // ======================================
  useEffect(() => {
    fetchApi();
  }, [coordinates, bounds]);
  // ======================================
  const fetchApi = async (sw, ne) => {
    try {
      // query = {
      //   bl_latitude: sw.lat,
      //   tr_latitude: ne.lat,
      //   bl_longitude: sw.lng,
      //   tr_longitude: ne.lng,
      // };
      const res = await fetch(
        "https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary?tr_longitude=109.262909&tr_latitude=12.346705&bl_longitude=109.095887&bl_latitude=12.113245",

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
        setPlaces(data.data);
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
          <List places={palces} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;

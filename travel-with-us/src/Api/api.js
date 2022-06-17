// import axios from "axios";
// const URL = `https://travel-advisor.p.rapidapi.com/list-in-boundary`;
// const options = {
//
//   headers: {
//     "X-RapidAPI-Key": "82e39a69f3msh5cb29321d7c6cc9p1efe1ejsn9f1e5b6e0bcd",
//     "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
//   },
// };
// export const getPlacesData = async (sw,ne) => {
//   try {
//     const {
//       data: { data },
//     } = await axios.get(URL,  {params: {
//     bl_latitude: "sw.lat",
//     tr_latitude: "ne.lat",
//     bl_longitude: "sw.lng",
//     tr_longitude: "ne.lng",
//   },
//   headers: {
//     "X-RapidAPI-Key": "82e39a69f3msh5cb29321d7c6cc9p1efe1ejsn9f1e5b6e0bcd",
//     "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
//   },});
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

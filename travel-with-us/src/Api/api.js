const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=11.847676&tr_latitude=12.838442&bl_longitude=109.095887&tr_longitude=109.149359&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=30&currency=USD&open_now=false&lunit=km&lang=en_US";
const options = {
  headers: {
    "X-RapidAPI-Key": "82e39a69f3msh5cb29321d7c6cc9p1efe1ejsn9f1e5b6e0bcd",
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};

export const fetchApi = async () => {
  try {
    const res = await fetch(URL, options);
    if (res.ok) {
      const data = await res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

import L from "leaflet";

const { REACT_APP_TOKEN } = process.env;

const config = {
  center: [50, 10],
  zoom: 5,
  layers: [
    L.tileLayer(
      `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${REACT_APP_TOKEN}`,
      {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        id: "mapbox.light"
      }
    )
  ]
};

export default config;

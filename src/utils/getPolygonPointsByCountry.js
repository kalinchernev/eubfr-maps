const countries = require("./countries.geo.json");

const getPolygonPointsByCountry = countryCode => {
  const data = countries.features.find(feature => feature.id === countryCode);

  const { coordinates } = data.geometry;

  const points = coordinates[0]
    ? coordinates[0].map(point => {
        const [lon, lat] = point;
        return { lat, lon };
      })
    : [];

  return points;
};

export default getPolygonPointsByCountry;

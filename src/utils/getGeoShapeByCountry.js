import countries from "./countries.geo.json";
import flip from "./flip";

const getGeoShapeByCountry = countryCode => {
  let shape = {};

  const data = countries.features.find(feature => feature.id === countryCode);

  // Flip coordinates for Elasticsearch
  // In GeoJSON and WKT, and therefore Elasticsearch, the correct coordinate order is longitude, latitude (X, Y) within coordinate arrays. This differs from many Geospatial APIs (e.g., Google Maps) that generally use the colloquial latitude, longitude (Y, X).
  // @see https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-shape.html
  switch (data.geometry.type) {
    case "MultiPolygon": {
      flip(data);
      break;
    }

    case "Polygon": {
      const { coordinates } = data.geometry;

      const coords =
        coordinates && coordinates[0]
          ? coordinates[0].map(point => {
              const [lon, lat] = point;
              return { lat, lon };
            })
          : [];

      delete data.geometry.coordinates;
      data.geometry.coordinates = coords;
      break;
    }
  }

  const { coordinates, type } = data.geometry;

  if (coordinates && type) {
    shape = {
      shape: type,
      coordinates: coordinates
    };
  }

  return shape;
};

export default getGeoShapeByCountry;

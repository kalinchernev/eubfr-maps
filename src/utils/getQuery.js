import getGeoShapeByCountry from "./getGeoShapeByCountry";

const getQuery = ({ country, map }) => {
  const shape = getGeoShapeByCountry(country);

  // The filter for the query.
  let filter = {};

  switch (shape.shape) {
    case "Polygon": {
      filter = {
        geo_polygon: {
          "project_locations.centroid": { points: shape.coordinates }
        }
      };

      break;
    }
    case "MultiPolygon": {
      filter = {
        geo_shape: {
          "project_locations.location": {
            shape: {
              type: "multipolygon",
              coordinates: shape.coordinates
            },
            relation: "within"
          }
        }
      };

      break;
    }
  }

  return {
    aggs: {
      locations: {
        nested: {
          path: "project_locations"
        },
        aggs: {
          country: {
            filter,
            aggs: {
              locations: {
                geohash_grid: {
                  size: 500,
                  field: "project_locations.centroid",
                  precision: map.getZoom() - 2
                },
                aggs: {
                  centroid: {
                    geo_centroid: {
                      field: "project_locations.centroid"
                    }
                  },
                  info: {
                    reverse_nested: {},
                    aggs: {
                      place: {
                        top_hits: {
                          size: 1,
                          sort: [
                            {
                              last_modified: {
                                order: "desc"
                              }
                            }
                          ],
                          _source: {
                            includes: ["title", "description"]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
};

export default getQuery;

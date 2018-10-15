import getPolygonPointsByCountry from "./getPolygonPointsByCountry";

const getQuery = map => {
  const points = getPolygonPointsByCountry("BGR");

  return {
    aggs: {
      locations: {
        nested: {
          path: "project_locations"
        },
        aggs: {
          country: {
            filter: {
              geo_polygon: {
                "project_locations.centroid": { points }
              }
            },
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

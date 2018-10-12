import getBoundingBox from "./getBoundingBox";

const getQuery = map => {
  const boundingBox = getBoundingBox(map);

  return {
    size: 0,
    aggregations: {
      locations: {
        nested: {
          path: "project_locations"
        },
        aggregations: {
          filtered: {
            filter: {
              geo_bounding_box: {
                "project_locations.centroid": {
                  top_left: boundingBox[0],
                  bottom_right: boundingBox[1]
                }
              }
            },
            aggregations: {
              countries: {
                geohash_grid: {
                  size: 500,
                  field: "project_locations.centroid",
                  precision: map.getZoom() - 2
                },
                aggregations: {
                  centroid: {
                    geo_centroid: {
                      field: "project_locations.centroid"
                    }
                  },
                  info: {
                    reverse_nested: {},
                    aggregations: {
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

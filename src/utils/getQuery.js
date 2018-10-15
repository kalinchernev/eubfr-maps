import getBoundingBox from "./getBoundingBox";

const getQuery = map => {
  const boundingBox = getBoundingBox(map);

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
                "project_locations.centroid": {
                  points: [
                    { lat: 42.4321019, lon: 23.318168 },
                    { lat: 43.2656884, lon: 24.7776861 },
                    { lat: 41.9251227, lon: 25.484723 },
                    { lat: 41.79467, lon: 23.8687763 }
                  ]
                }
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

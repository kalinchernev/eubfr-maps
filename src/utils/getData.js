import L from "leaflet";
import getBoundingBox from "./getBoundingBox";

const { REACT_APP_ES_PUBLIC_ENDPOINT } = process.env;

const getData = options => {
  const { map, markerGroup } = options;

  const bb = getBoundingBox(map);
  markerGroup.clearLayers();

  fetch(REACT_APP_ES_PUBLIC_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
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
                    top_left: bb[0],
                    bottom_right: bb[1]
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
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data =>
      data.aggregations.locations.filtered.countries.buckets.map(m => {
        let options = {};
        if (m.centroid.count > 1) {
          options = {
            icon: new L.DivIcon({
              className: "aggregation-marker",
              html: `<span class="aggregation-marker__span--cluster">
          ${m.centroid.count}
          </span>`
            })
          };
        } else {
          options = {
            icon: new L.DivIcon({
              className: "aggregation-marker",
              html: `<span class="aggregation-marker__span--single">
          <img src="https://xrpcharts.ripple.com/assets/icons/icn_info.svg"/>
          </span>`
            }),
            title: m.info.place.hits.hits[0]._source.title
          };
        }

        L.marker(m.centroid.location, options).addTo(markerGroup);
      })
    )
    .catch(error => console.error("Error:", error));
};

export default getData;

import L from "leaflet";

const visualizeData = ({ data, markerGroup }) => {
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
  });
};

export default visualizeData;

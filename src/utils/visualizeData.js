import L from "leaflet";

const visualizeData = ({ data, markerGroup }) => {
  data.aggregations.locations.country.locations.buckets.forEach(bucket => {
    let options = {};
    if (bucket.centroid.count > 1) {
      options = {
        icon: new L.DivIcon({
          className: "aggregation-marker",
          html: `<span class="aggregation-marker__span--cluster">
      ${bucket.centroid.count}
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
        title: bucket.info.place.hits.hits[0]._source.title
      };
    }

    L.marker(bucket.centroid.location, options).addTo(markerGroup);
  });
};

export default visualizeData;

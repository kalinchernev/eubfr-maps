import getQuery from "./getQuery";
import visualizeData from "./visualizeData";

const { REACT_APP_ES_PUBLIC_ENDPOINT } = process.env;

const getData = options => {
  const { map, markerGroup } = options;
  markerGroup.clearLayers();

  const query = getQuery(map);

  fetch(REACT_APP_ES_PUBLIC_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(query),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => visualizeData({ data, markerGroup }))
    .catch(error => console.error("Error:", error));
};

export default getData;

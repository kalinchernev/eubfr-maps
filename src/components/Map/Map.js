import React, { Fragment } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

import codes from "../../utils/countryCodes";
import updateMapData from "../../utils/updateMapData";
import MapConfig from "./MapConfig";

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.map = {};
    this.state = { country: "DEU" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const country = event.target.value;

    this.setState({ country });

    updateMapData({ country, map: this.map, markerGroup: this.markerGroup });
  }

  componentDidMount() {
    const { country } = this.state;

    // create map
    this.map = L.map("map", MapConfig);
    this.markerGroup = L.layerGroup().addTo(this.map);

    updateMapData({ country, map: this.map, markerGroup: this.markerGroup });

    this.map.on("moveend", () => {
      const { country } = this.state;
      updateMapData({ country, map: this.map, markerGroup: this.markerGroup });
    });
  }

  render() {
    const { country } = this.state;

    return (
      <Fragment>
        <form
          id="filters"
          className="ecl-form"
          style={{ marginBottom: "40px" }}
        >
          <fieldset className="ecl-fieldset">
            <legend className="ecl-form-legend">Search</legend>

            <div className="ecl-form-group">
              <label className="ecl-form-label" htmlFor="countries">
                Countries
              </label>
            </div>
            <select
              onChange={this.handleChange}
              value={country}
              className="ecl-select"
              id="countries"
              name="countries"
            >
              {codes.map((code, key) => {
                return (
                  <option key={key} value={code}>
                    {code}
                  </option>
                );
              })}
            </select>
          </fieldset>
        </form>
        <div
          id="map"
          style={{ width: "60vw", height: "60vh", marginBottom: "40px" }}
        />
      </Fragment>
    );
  }
}
export default Map;

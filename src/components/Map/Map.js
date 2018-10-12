import React, { Fragment } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

import getData from "../../utils/getData";
import MapConfig from "./MapConfig";

class Map extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map("map", MapConfig);

    this.markerGroup = L.layerGroup().addTo(this.map);

    this.map.on("moveend", () =>
      getData({ map: this.map, markerGroup: this.markerGroup })
    );

    getData({ map: this.map, markerGroup: this.markerGroup });
  }

  render() {
    return (
      <Fragment>
        <form
          id="filters"
          className="ecl-form"
          style={{ marginBottom: "40px" }}
        >
          <fieldset class="ecl-fieldset">
            <legend class="ecl-form-legend ecl-form-legend--level-1">
              Search
            </legend>

            <div class="ecl-form-group">
              <label class="ecl-form-label" for="countries">
                Countries
              </label>
            </div>
            <select class="ecl-select" id="countries" name="countries">
              <option value="All" selected="selected">
                - Any -
              </option>
              <option value="AT">Austria</option>
              <option value="PL">Poland</option>
              <option value="BE">Belgium</option>
              <option value="BG">Bulgaria</option>
              <option value="EE">Estonia</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="EL">Greece</option>
              <option value="HU">Hungary</option>
              <option value="IT">Italy</option>
              <option value="RO">Romania</option>
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
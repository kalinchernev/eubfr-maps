import React, { Fragment } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

import getData from "../utils/getData";

const { REACT_APP_TOKEN } = process.env;

class Map extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [50, 10],
      zoom: 5,
      layers: [
        L.tileLayer(
          `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${REACT_APP_TOKEN}`,
          {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            id: "mapbox.light"
          }
        )
      ]
    });

    this.markerGroup = L.layerGroup().addTo(this.map);

    this.map.on("moveend", () =>
      getData({ map: this.map, markerGroup: this.markerGroup })
    );

    getData({ map: this.map, markerGroup: this.markerGroup });
  }
  render() {
    return (
      <Fragment>
        <div
          id="map"
          style={{ width: "60vw", height: "60vh", marginBottom: "40px" }}
        />
        <form id="filters">
          <select
            class="form-control form-select"
            id="edit-sm-af-country"
            name="sm_af_country"
          >
            <option value="All" selected="selected">
              - Any -
            </option>
            <option value="AT">Austria</option>
            <option value="BE">Belgium</option>
            <option value="BG">Bulgaria</option>
            <option value="HR">Croatia</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="EE">Estonia</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="EL">Greece</option>
            <option value="HU">Hungary</option>
            <option value="IE">Ireland</option>
            <option value="IT">Italy</option>
            <option value="LV">Latvia</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MT">Malta</option>
            <option value="NL">Netherlands</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="RO">Romania</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="ES">Spain</option>
            <option value="SE">Sweden</option>
            <option value="UK">United Kingdom</option>
            <option value="AF">Afghanistan</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AO">Angola</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="BD">Bangladesh</option>
            <option value="BY">Belarus</option>
            <option value="BO">Bolivia</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="BR">Brazil</option>
            <option value="BF">Burkina Faso</option>
            <option value="KH">Cambodia</option>
            <option value="CM">Cameroon</option>
            <option value="CV">Cape Verde</option>
            <option value="TD">Chad</option>
            <option value="CN">China</option>
            <option value="CO">Colombia</option>
            <option value="CD">Congo [Democratic Republic]</option>
            <option value="CU">Cuba</option>
            <option value="DO">Dominican Republic</option>
            <option value="TL">East Timor</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="ET">Ethiopia</option>
            <option value="GM">Gambia</option>
            <option value="GE">Georgia</option>
            <option value="HT">Haiti</option>
            <option value="HN">Honduras</option>
            <option value="IN">India</option>
            <option value="IL">Israel</option>
            <option value="JO">Jordan</option>
            <option value="KZ">Kazakhstan</option>
            <option value="KE">Kenya</option>
            <option value="KG">Kyrgyzstan</option>
            <option value="LA">Lao People's Democratic Republic</option>
            <option value="LB">Lebanon</option>
            <option value="MW">Malawi</option>
            <option value="ML">Mali</option>
            <option value="MX">Mexico</option>
            <option value="MD">Moldova</option>
            <option value="MN">Mongolia</option>
            <option value="ME">Montenegro</option>
            <option value="MM">Myanmar</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="NO">Norway</option>
            <option value="PK">Pakistan</option>
            <option value="PS">Palestine*</option>
            <option value="PG">Papua New Guinea</option>
            <option value="PH">Philippines</option>
            <option value="RU">Russian Federation</option>
            <option value="SN">Senegal</option>
            <option value="RS">Serbia</option>
            <option value="SO">Somalia</option>
            <option value="ZA">South Africa</option>
            <option value="LK">Sri Lanka</option>
            <option value="SD">Sudan</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syrian Arab republic</option>
            <option value="TJ">Tajikistan</option>
            <option value="TH">Thailand</option>
            <option value="TR">Turkey</option>
            <option value="UG">Uganda</option>
            <option value="UA">Ukraine</option>
            <option value="US">United States</option>
            <option value="UZ">Uzbekistan</option>
            <option value="VN">Vietnam</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="MK">
              the former Yugoslav Republic of Macedonia
            </option>
          </select>
        </form>
      </Fragment>
    );
  }
}
export default Map;

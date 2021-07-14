import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { ActionTypes } from "../../../common/stores/taxes";
import { useTheme } from "../../../common/contexts/theme";
import Table from "./Table";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "../styles/_app.scss";

const columns = [
  {
    label: "ID",
    key: "id",
  },
  {
    label: "Zip Code",
    key: "zip_code",
  },
  {
    label: "City",
    key: "city",
  },
  {
    label: "City Rate",
    key: "city_rate",
  },
  {
    label: "State",
    key: "state",
  },
  {
    label: "State Name",
    key: "state_name",
  },
  {
    label: "State Rate",
    key: "state_rate",
  },
  {
    label: "County",
    key: "county",
  },
  {
    label: "County Rate",
    key: "county_rate",
  },
  {
    label: "Special",
    key: "special",
  },
  {
    label: "Combined Rate",
    key: "combined_rate",
    shorten: "Comb Rate",
  },
  {
    label: "Combined District Rate",
    key: "combined_district_rate",
    shorten: "CDR",
  },
];

function App() {
  const [isDarkMode, toggleTheme] = useTheme();
  const data = useSelector((state) => state.filtered);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    if (!data) return;
    dispatch({
      type: ActionTypes.FILTER_ENTRIES,
      payload: filters,
    });
  }, [filters]);

  return (
    <div className="app">
      <div className="level">
        <div>
          <h1 className="title">Dark Mode Challenge</h1>
          {data && JSON.stringify(data.current_page)}
        </div>

        {/* --The button that should toggle dark mode-- */}
        <button
          className="app__dark-mode-btn icon level-right"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon
            color={isDarkMode ? "#FFA500" : ""}
            icon={isDarkMode ? faSun : faMoon}
          />
        </button>
      </div>

      <div className="columns">
        <div className="column">
          <p>
            Lollipop powder powder. Cotton candy caramels chupa chups halvah
            muffin caramels apple pie topping cake. Topping chocolate bar pastry
            chocolate cake. Cupcake tart jujubes dragée jelly-o icing sugar
            plum. Chocolate bar lollipop candy canes. Biscuit croissant apple
            pie pudding caramels wafer tart tootsie roll macaroon. Croissant
            tiramisu chocolate bar carrot cake lemon drops halvah.
          </p>
        </div>
        <div className="column">
          <p>
            Marshmallow tiramisu liquorice bear claw chocolate bar bear claw
            tart. Muffin chupa chups pie. Brownie apple pie topping lemon drops
            marzipan toffee. Pudding macaroon icing ice cream bonbon cake tart.
            Pudding sugar plum chocolate cake cake biscuit pastry pastry
            chocolate bar tart. Lemon drops dessert gummies icing.
          </p>
        </div>
      </div>
      <p>Filter by</p>
      <div className="columns is-variable is-4">
        <div className="column is-one-fifth">
          <p>Zip Code</p>
          <input
            className="input is-primary"
            type="text"
            placeholder="Primary input"
            onChange={(e) =>
              setFilters({ ...filters, zipCode: e.target.value })
            }
          ></input>
        </div>
        <div className="column is-one-fifth">
          <p>City</p>
          <input
            className="input is-primary"
            type="text"
            placeholder="Primary input"
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          ></input>
        </div>
        <div className="column is-one-fifth">
          <p>State</p>
          <input
            className="input is-primary"
            type="text"
            placeholder="Primary input"
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          ></input>
        </div>
      </div>
      <div className="level">
        {data && <Table columns={columns} rows={data} />}
      </div>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Name" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Email" />
        </div>
      </div>

      <section className="section">
        <div className="buttons level-right">
          <a className="button is-primary">Save</a>
          <a className="button is-link">Submit</a>
        </div>
      </section>
    </div>
  );
}

export default App;

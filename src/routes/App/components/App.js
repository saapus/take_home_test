import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ActionTypes } from "../../../common/stores/taxes";
import { useTheme } from "../../../common/contexts/theme";
import InputField from "./InputField";
import Table from "./Table";
import { columns } from "../../../common/constants/tax";
import "../styles/_app.scss";


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
      <div className="container">
        <h2 className="subtitle">Filter by</h2>
      </div>
      <div className="level">
        <InputField label="Zip Code" value={filters.zipCode}
          onChange={(e) => setFilters({ ...filters, zipCode: e.target.value })}
        />
        <InputField label="City" value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
        <InputField label="State" value={filters.state}
          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
        />
      </div>
      <div className="container level columns is-variable is-4"></div>
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

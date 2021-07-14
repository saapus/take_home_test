import React from "react";
import PropTypes from "prop-types";

function Table({ columns, rows }) {
  return (
    <>
      <table className="table is-hoverable">
        <thead>
          <tr>
            {columns.map((i) => (
							<th>
								{i.shorten
									? <><abbr title={i.label}>{i.shorten}</abbr></>
									: i.label
								}
							</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr>
              {columns.map((i) => (
                <td>{row[i.key] || null} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
};

export default Table;

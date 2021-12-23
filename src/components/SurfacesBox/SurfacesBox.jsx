import React, { useState } from "react";

const SurfacesBox = ({ formProps }) => {
  const columnsArray = ["Planta", "Uso", "m2", "Precio (€)", "Disponibilidad"];
  const [rows, setRows] = useState([{}]);

  const handleAddRow = () => {
    const item = {};
    setRows([...rows, item]);
  };

  const handleRemoveSpecificRow = (idx) => {
    const tempRows = [...rows]; // to avoid  direct state mutation
    tempRows.splice(idx, 1);
    setRows(tempRows);
  };

  const updateState = (e) => {
      console.log("evento:", e.target)
    console.log("Columna:", e.target.attributes.column.value);
    console.log("Fila:", e.target.attributes.index.value);
    console.log("Valor:", e.target.value);

    let prope = e.target.attributes.column.value; // the custom column attribute
    let index = e.target.attributes.index.value; // index of state array -rows
    let fieldValue = e.target.value; // value

    const tempRows = [...rows]; // avoid direct state mutation
    const tempObj = rows[index]; // copy state object at index to a temporary object
    tempObj[prope] = fieldValue; // modify temporary object

    // return object to rows` clone
    tempRows[index] = tempObj;
    setRows(tempRows); // update state
  };

  return (
    <div>
      <div>Cuadro Superficies</div>
      <table className="surfaceBox">
        <thead>
          <tr>
            {columnsArray.map((column, index) => (
              <th className="text-center" key={index}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, idx) => (
            <tr key={idx}>
              {columnsArray.map((column, index) => (
                <td key={index}>
                  <input
                    type="text"
                    column={column}
                    value={rows.length !== 0 ? rows[idx][column] : ""}
                    index={idx}
                    className="form-control"
                    onChange={(e) => updateState(e)}
                  />
                </td>
              ))}

              <td>
                <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => handleRemoveSpecificRow(idx)}>
                  Eliminar fila
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddRow} className="btn btn-primary">
        Añadir fila
      </button>
      <hr />
    </div>
  );
};

export default SurfacesBox;

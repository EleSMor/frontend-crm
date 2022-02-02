import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { BsTrash } from "react-icons/bs";

const SurfacesBox = ({ formProps }) => {
  const [surfacesBox, setSurfacesBox] = useState(formProps.values.surfacesBox);

  const handleAddRow = () => {
    const item = {
      id: surfacesBox.length + 1,
      surfaceFloor: "",
      surfaceUse: "",
      metersAvailables: "",
      metersPrice: "",
      surfaceDisponibility: "",
    };
    setSurfacesBox([...surfacesBox, item]);
    formProps.setFieldValue("surfacesBox", [...surfacesBox, item]);

  };

  const textEditor = (options) => {
    return (
      <InputText
        style={{ width: "105%" }}
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const onRowEditComplete = (e) => {
    let updateSurface = surfacesBox;
    let { newData, index } = e;
    
    updateSurface[index] = newData;


    setSurfacesBox(updateSurface);
    formProps.setFieldValue("surfacesBox", updateSurface);
  };

  const deleteRow = (row) => {
    const newSurfacesBox = surfacesBox.filter((surfaceRow) => surfaceRow.id !== row.id);
    formProps.setFieldValue("surfacesBox", newSurfacesBox);
    setSurfacesBox(newSurfacesBox);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
      <h4>Cuadro Superficies</h4>
      <br />
      <DataTable
        style={{ alignSelf: "center", width: "100%" }}
        value={surfacesBox}
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        className="editable-cells-table"
        resizableColumns
        columnResizeMode="fit"
        responsiveLayout="scroll"
        emptyMessage="Añada una fila si lo necesita"
      >
        <Column
          field="surfaceFloor"
          header="Planta"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        />
        <Column field="surfaceUse" header="Uso" editor={(options) => textEditor(options)} style={{ width: "20%" }} />
        <Column
          field="metersAvailables"
          header={
            <>
              m<sup>2</sup>{" "}
            </>
          }
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        />
        <Column
          field="metersPrice"
          header="Precio (€)"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        />
        <Column
          field="surfaceDisponibility"
          header="Disponibilidad"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        />
        <Column rowEditor headerStyle={{ width: "10%" }} bodyStyle={{ textAlign: "center" }} />
        <Column
          style={{ width: "10%" }}
          bodyStyle={{ textAlign: "center" }}
          body={(row) => {
            return (
              <BsTrash onClick={() => deleteRow(row)} />
            );
          }}
        />
      </DataTable>
      <br />
      <button
        style={{ alignSelf: "flex-start", border: "1px solid rgba(128, 128, 128, 0.603)" }}
        type="button"
        onClick={handleAddRow}
        className="btn"
      >
        Añadir fila
      </button>
      <hr />
    </div>
  );
};

export default SurfacesBox;

import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

const SurfacesBox = ({ formProps }) => {
  const [surfacesBox, setSurfacesBox] = useState(formProps.values.surfacesBox);

  const handleAddRow = () => {
    const item = {
      surfaceFloor: "",
      surfaceUse: "",
      metersAvailables: "",
      metersPrice: "",
      surfaceDisponibility: "",
    };
    setSurfacesBox([...surfacesBox, item]);
  };

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  const onRowEditComplete = (e) => {
    let updateSurface = surfacesBox;
    let { newData, index } = e;

    updateSurface[index] = newData;

    setSurfacesBox(updateSurface);
    formProps.setFieldValue("surfacesBox", surfacesBox);
  };

  return (
    <div>
      <h4>Cuadro Superficies</h4>
      <DataTable
        value={surfacesBox}
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        className="editable-cells-table"
        responsiveLayout="scroll"
      >
        <Column
          field="surfaceFloor"
          header="Planta"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="surfaceUse"
          header="Uso"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="metersAvailables"
          header={
            <>
              m<sup>2</sup>{" "}
            </>
          }
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="metersPrice"
          header="Precio (€)"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="surfaceDisponibility"
          header="Disponibilidad"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column rowEditor headerStyle={{ width: "10%", minWidth: "8rem" }} bodyStyle={{ textAlign: "center" }}></Column>
      </DataTable>
      <button type="button" onClick={handleAddRow} className="btn">
        Añadir fila
      </button>
      <hr />
    </div>
  );
};

export default SurfacesBox;

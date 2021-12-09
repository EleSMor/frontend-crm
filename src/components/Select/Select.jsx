import * as React from "react";
import { MultiSelectComponent, CheckBoxSelection, Inject } from "@syncfusion/ej2-react-dropdowns";
import "./Select.scss";

const CheckBoxGrouping = ({ list, fields, fn, disabled, placeholder }) => {
  const zones = list;
  const checkFields = fields;
  // set the placeholder to the MultiSelect input
  const checkWaterMark = placeholder ? placeholder : "Seleccionar zonas";
  // set enableGroupCheckBox value to the Multiselect input
  const enableGroupCheckBox = true;
  // set mode value to the multiselect input
  const mode = "CheckBox";
  // set the placeholder to the filter bar
  const filterBarPlaceholder = "Buscar";

  return (
    <div id="checkboxgroup" className="control-panel">
      <div className="control-section col-lg-12">
        <div id="multigroup" className="control-styles">
          <MultiSelectComponent
            id="checkbox"
            dataSource={zones}
            ignoreAccent={true}
            allowFiltering={true}
            filterBarPlaceholder={filterBarPlaceholder}
            fields={checkFields}
            placeholder={checkWaterMark}
            mode={mode}
            enableGroupCheckBox={enableGroupCheckBox}
            showDropDownIcon={true}
            enableSelectionOrder={false}
            disabled={disabled}
            onChange={(e) => {
              console.log("Valor seleccionado: ", e.value)
              fn(e.value);
            }}
          >
            <Inject services={[CheckBoxSelection]} />
          </MultiSelectComponent>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxGrouping;

import * as React from "react";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import "./Select.scss";

const CheckBoxGrouping = ({ list, fields, fn, disabled, defaultValues }) => {
  const data = list;
  const checkFields = fields;
  // set the placeholder to the MultiSelect input
  const checkWaterMark = "Seleccionar";
  // set enableGroupCheckBox value to the Multiselect input
  const enableGroupCheckBox = true;
  // set mode value to the multiselect input
  const mode = "Box";
  // set the placeholder to the filter bar
  const filterBarPlaceholder = "Buscar";

  return (
    <div id="multisection" className="control-panel">
      <div className="control-section col-lg-12">
        <div id="multigroup" className="control-styles">
          <MultiSelectComponent
            id="boxelement"
            dataSource={data}
            ignoreAccent={true}
            ignoreCase={true}
            maximumSelectionLength={1}
            allowFiltering={true}
            filterBarPlaceholder={filterBarPlaceholder}
            fields={checkFields}
            placeholder={checkWaterMark}
            mode={mode}
            required={true}
            value={defaultValues}
            enableGroupCheckBox={enableGroupCheckBox}
            showDropDownIcon={true}
            enableSelectionOrder={false}
            disabled={disabled}
            onChange={(e) => {
              console.log(e.value);
              fn(e.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckBoxGrouping;

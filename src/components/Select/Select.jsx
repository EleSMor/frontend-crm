import * as React from "react";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import "./Select.scss";

const CheckBoxGrouping = ({ list, fields, fn, filter, disabled, defaultValues, label }) => {
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
    <div className="Select">
      <label>{label}</label>
      <div id="multisection" className="control-panel">
        <div className="control-section">
          <div id="multigroup" className="control-styles Select__input">
            <ComboBoxComponent
              id="boxelement"
              dataSource={data}
              ignoreAccent={true}
              ignoreCase={true}
              // maximumSelectionLength={1}
              allowFiltering={true}
              filtering={filter}
              filterBarPlaceholder={filterBarPlaceholder}
              fields={checkFields}
              placeholder={checkWaterMark}
              // mode={mode}
              required={true}
              value={defaultValues}
              enableGroupCheckBox={enableGroupCheckBox}
              showDropDownIcon={true}
              enableSelectionOrder={false}
              disabled={disabled}
              onChange={fn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxGrouping;

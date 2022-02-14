import * as React from "react";
import { DropDownListComponent  } from "@syncfusion/ej2-react-dropdowns";
import "./Select.scss";

const CheckBoxGrouping = ({ list, fields, fn, filter, disabled, defaultValues, label }) => {
  const data = list;
  const checkFields = fields;
  // set the placeholder to the MultiSelect input
  const checkWaterMark = "Seleccionar";
  // // set mode value to the multiselect input
  // set the placeholder to the filter bar
  const filterBarPlaceholder = "Buscar";

  return (
    <div className="Select">
      <label>{label}</label>
      <div id="multisection" className="control-panel">
        <div className="control-section">
          <div id="multigroup" className="control-styles Select__input">
            <DropDownListComponent 
              id="boxelement"
              dataSource={data}
              ignoreAccent={true}
              ignoreCase={true}
              allowFiltering={true}
              filtering={filter}
              filterBarPlaceholder={filterBarPlaceholder}
              fields={checkFields}
              placeholder={checkWaterMark}
              required={true}
              value={defaultValues}
              showDropDownIcon={true}
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

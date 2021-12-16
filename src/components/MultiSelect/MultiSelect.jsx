import * as React from "react";
import { MultiSelectComponent, CheckBoxSelection, Inject } from "@syncfusion/ej2-react-dropdowns";
import "./MultiSelect.scss";

const CheckBoxGrouping = ({ list, fields, fn, disabled, defaultValues }) => {
  const data = list;
  const checkFields = fields;
  // set the placeholder to the MultiSelect input
  const checkWaterMark = "Seleccionar";
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
            dataSource={data}
            ignoreAccent={true}
            ignoreCase={true}
            allowFiltering={true}
            filterBarPlaceholder={filterBarPlaceholder}
            fields={checkFields}
            placeholder={checkWaterMark}
            mode={mode}
            value={defaultValues}
            enableGroupCheckBox={enableGroupCheckBox}
            showDropDownIcon={true}
            enableSelectionOrder={false}
            disabled={disabled}
            onChange={(e) => {
              console.log(e.value);
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

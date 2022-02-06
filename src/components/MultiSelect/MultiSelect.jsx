import * as React from "react";
import { MultiSelectComponent, CheckBoxSelection, Inject } from "@syncfusion/ej2-react-dropdowns";
import "./MultiSelect.scss";

const CheckBoxGrouping = ({ label, list, fields, disabled, value, onChange }) => {
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
    <div className="Select">
      <label>{label}</label>
      <div id="checkboxgroup" className="control-panel">
        <div className="control-section">
          <div id="multigroup" className="control-styles Select__input">
            <MultiSelectComponent
              id="checkbox"
              dataSource={data}
              ignoreAccent={true}
              ignoreCase={true}
              allowFiltering={true}
              filtering={(e) => {
                const searchData = data.filter((zone) =>
                  zone.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(e.text.toLowerCase())
                );
                e.updateData(searchData);
              }}
              filterBarPlaceholder={filterBarPlaceholder}
              fields={checkFields}
              placeholder={checkWaterMark}
              mode={mode}
              value={value}
              enableGroupCheckBox={enableGroupCheckBox}
              showDropDownIcon={true}
              enableSelectionOrder={true}
              disabled={disabled}
              onChange={onChange}
            >
              <Inject services={[CheckBoxSelection]} />
            </MultiSelectComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxGrouping;

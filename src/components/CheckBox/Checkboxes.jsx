import "./Checkbox.scss";

const Checkboxes = ({
  label,
  textA,
  nameA,
  valueA,
  onChangeA,
  checkedA,
  required,
  textB,
  nameB,
  valueB,
  onChangeB,
  checkedB,
  textC,
  valueC,
  onChangeC,
  checkedC,
  type,
}) => {
  return (
    <div className="Checkboxes">
      <label htmlFor="tag">
        <span className="Checkboxes__label">{label}</span>

        <div className="Checkboxes__checks">
          <input
            name={nameA}
            type={type ? type : "checkbox"}
            value={valueA}
            onChange={onChangeA}
            checked={checkedA}
            required={required}
          />
          <span style={{ marginLeft: 5 }}>{textA}</span>

          <input
            name={nameB}
            type={type ? type : "checkbox"}
            value={valueB}
            onChange={onChangeB}
            checked={checkedB}
            required={required}
          />
          <span style={{ marginLeft: 5 }}>{textB}</span>
          {textC && (
            <>
              <input
                type={type ? type : "checkbox"}
                value={valueC}
                onChange={onChangeC}
                checked={checkedC}
                required={required}
              />
              <span style={{ marginLeft: 5 }}>{textC}</span>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default Checkboxes;

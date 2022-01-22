import "./Checkbox.scss";

const Checkboxes = ({
  label,
  textA,
  valueA,
  onChangeA,
  checkedA,
  required,
  textB,
  valueB,
  onChangeB,
  checkedB,
  type,
}) => {
  return (
    <div className="Checkboxes">
      <label htmlFor="tag">
        <span className="Checkboxes__label">{label}</span>

        <div className="Checkboxes__checks">
          <input
            type={type ? type : "checkbox"}
            value={valueA}
            onChange={onChangeA}
            checked={checkedA}
            required={required}
          />
          <span style={{ marginLeft: 5 }}>{textA}</span>

          <input
            type={type ? type : "checkbox"}
            value={valueB}
            onChange={onChangeB}
            checked={checkedB}
            required={required}
          />
          <span style={{ marginLeft: 5 }}>{textB}</span>
        </div>
      </label>
    </div>
  );
};

export default Checkboxes;

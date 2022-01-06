import "./Checkbox.scss";

const Checkboxes = ({ label, 
  textA, valueA, onChangeA, checkedA,
  textB, valueB, onChangeB, checkedB
}) => {
  return (
    <div className="Checkboxes">
      <label htmlFor="tag">

        <span className="Checkboxes__label">
          {label}
        </span>

        <div className="Checkboxes__checks">
          <input
            type="checkbox"
            value={valueA}
            onChange={onChangeA}
            checked={checkedA}
          />
          <span style={{marginLeft: 5}}>{textA}</span>

          <input
            style={{marginLeft: 20}}
            type="checkbox"
            value={valueB}
            onChange={onChangeB}
            checked={checkedB}
          />
          <span style={{marginLeft: 5}}>{textB}</span>
        </div>

      </label>
    </div>
  );
};

export default Checkboxes;

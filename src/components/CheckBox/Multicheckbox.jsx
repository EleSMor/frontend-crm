import "./Checkbox.scss";

const Multicheckbox = ({ label, required, inputs, onChange }) => {
  return (
    <div className="Checkboxes">
      <label htmlFor="tag">
        <span className="Checkboxes__label">{label}</span>

        <div className="Checkboxes__checks">
          {inputs.map((input) => (
            <div key={input.value} className="Checkboxes__checks--group">
              <input
                type="checkbox"
                value={input.value}
                onChange={onChange}
                checked={input.checked}
                required={required}
              />
              <span style={{ marginLeft: 5 }}>{input.value}</span>
            </div>
          ))}
        </div>
      </label>
    </div>
  );
};

export default Multicheckbox;

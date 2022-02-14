import "./Checkbox.scss";

const Multicheckbox = ({ label, required, inputs }) => {
  return (
    <div className="Checkboxes">
      <label htmlFor="tag">
        <span className="Checkboxes__label">{label}</span>

        <div className="Checkboxes__checks Checkboxes__checks">
          {inputs.map((input) => (
            <div key={input.value}>
              {input.name ? (
                <div  className="Checkboxes__checks--group">
                  {input.icon}
                  <input
                    type="checkbox"
                    value={input.value}
                    onChange={input.onChange}
                    checked={input.checked}
                    required={required}
                  />
                </div>
              ) : (
                <div  className="Checkboxes__checks--group">
                  <input
                    type="checkbox"
                    value={input.value}
                    onChange={input.onChange}
                    checked={input.checked}
                    required={required}
                  />
                  <span style={{ marginLeft: 5 }}>{input.value}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </label>
    </div>
  );
};

export default Multicheckbox;

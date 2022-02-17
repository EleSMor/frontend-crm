import "./InputsGroup.scss";

const InputsGroup = ({ label, inputs, directionStyle }) => {
  return (
    <div className="InputsGroup">
      <p>{label}</p>
      <div className={directionStyle === "direction" ? "InputsGroup__direction" : "InputsGroup__inputs"}>
        {inputs.map((input) => (
          <div key={`${input.name}-${input.label}`}>
            {input?.type === "checkbox" ? (
              <div className={"InputsGroup__inputs-input--flex"}>
                <input
                  onWheel={(e) => e.target.blur()}
                  onKeyUp={(e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  }}
                  name={input.name}
                  value={input.value}
                  onChange={input.onChange}
                  onBlur={input.onBlur}
                  onFocus={input.onFocus}
                  type={input.type}
                  placeholder={input?.placeholder}
                  required={input?.required}
                  lang={input?.lang}
                  checked={input?.checked}
                />
                <label htmlFor={input.name}>{input.label}</label>
                <p>{input.error}</p>
              </div>
            ) : (
              <div
                className={input?.style === "direction" ? "InputsGroup__direction-input" : "InputsGroup__inputs-input"}
              >
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  onWheel={(e) => e.target.blur()}
                  onKeyUp={(e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  }}
                  name={input.name}
                  value={input.value}
                  onChange={input.onChange}
                  onBlur={input.onBlur}
                  onFocus={input.onFocus}
                  type={input.type}
                  placeholder={input?.placeholder}
                  required={input?.required}
                  lang={input?.lang}
                  checked={input?.checked}
                  min="0"
                />
                {!!input?.span && input?.span}
                <p>{input.error}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputsGroup;

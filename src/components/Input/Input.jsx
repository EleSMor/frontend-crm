import "./Input.scss"

const Input = ({
  label,
  type,
  placeholder,
  onBlur,
  value,
  onChange,
  onFocus,
  autoComplete,
  error
}) => {
  return (
    <div className="Input">
      <label>{label}</label>

      <div className={`Input-input ${error && "Input-error"}`}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete={autoComplete}
        />
      </div>

      <p className="Input-errors">
        <small><i>{error}</i></small>
      </p>

    </div>
  );
};

export default Input;

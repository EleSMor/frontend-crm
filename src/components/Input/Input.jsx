import "./Input.scss"

const Input = ({
  label,
  type,
  placeholder,
  required,
  name,
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
          name={name}
          required={required}
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

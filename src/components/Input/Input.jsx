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

      <div className={`${error && "is-invalid"} `}>
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

      <p>
        <small>{error}</small>
      </p>

    </div>
  );
};

export default Input;

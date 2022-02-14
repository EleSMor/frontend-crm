import "./Textarea.scss";

const Textarea = ({ label, name, value, onChange, error, placeholder }) => {
  return (
    <>
      <div className={`Textarea`}>
        <label htmlFor={name}>{label}</label>
        <div className={`Textarea-input ${error && "error"}`}>
          <textarea name={name} value={value} onChange={onChange} placeholder={placeholder}/>
        </div>
      </div>
      <p className="errors">
        <small><i>{error}</i></small>
      </p>
    </>
  );
};

export default Textarea;

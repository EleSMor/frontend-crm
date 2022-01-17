import "./InputsGroup.scss"

const InputsGroup = ({ label, inputs}) => {
  return (
    <div className='InputsGroup'>
      <p>{label}</p>
      <div className="InputsGroup__inputs">
        {
          inputs.map((input) => (
            <div key={input.name} 
              className="InputsGroup__inputs-input">
              <label htmlFor={input.name}>{input.label}</label>
              <input 
                name={input.name}
                value={input.value}
                onChange={input.onChange}
                type={input?.type}
                placeholder={input?.placeholder}
              />
              <p>{input.error}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default InputsGroup

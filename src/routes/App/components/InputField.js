function InputField({ label, value, onChange }) {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{label}</label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input
              className="input"
              type="text"
              value={value}
              onChange={onChange}
            />
          </p>
        </div>
      </div>
    </div>
  );
}

export default InputField;
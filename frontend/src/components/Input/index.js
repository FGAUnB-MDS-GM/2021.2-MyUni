import "./styles.scss";
function Input({ type, placeholder, title, value, onChange, ...rest }) {
  return (
    <div className="InputContainer">
      <label className="InputContainer_label">{title}</label>
      {type === "textarea" ? (
        <textarea
          className="InputContainer_textarea"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      ) : (
        <input
          className="InputContainer_input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
    </div>
  );
}
Input.defaultProps = {
  type: "text",
  placeholder: "",
  name: "",
  title: "",
  value: "",
  onChange: () => {},
};
export default Input;

import "./styles.scss";
function Input({ type, placeholder, title, value, onChange, ...sobra }) {
  return (
    <div className="InputContainer">
      <label className="InputContainer_label">{title}</label>
      <input
        className="InputContainer_input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...sobra}
      />
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

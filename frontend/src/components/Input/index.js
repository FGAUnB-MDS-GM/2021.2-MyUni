import "./styles.scss";
function Input({ type, placeholder, title, value, onChange }) {
  return (
    <div className="InputContainer">
      <label className="InputContainer_label">{title}</label>
      <input
        className="InputContainer_input"
        type={type}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
Input.defaultProps = {
  type: "text",
  placeholder: "",
  title: "",
  value: "",
  onChange: () => {},
};
export default Input;

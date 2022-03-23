import "./styles.css";

function Input({ tipo, placeholder, titulo }) {
  return (
    <>
      <label>{titulo}</label>
      <input
        className="InputContainer"
        type={tipo}
        placeholder={placeholder}
      ></input>
    </>
  );
}
export default Input;

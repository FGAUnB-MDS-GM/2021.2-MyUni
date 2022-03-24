import "./styles.scss";
function Button({ label, onClick }) {
  return (
    <button onClick={onClick} className="buttonGetIn">
      {label}
    </button>
  );
}
export default Button;

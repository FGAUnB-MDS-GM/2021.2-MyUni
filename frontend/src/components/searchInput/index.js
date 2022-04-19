import { SearchIcon } from "@heroicons/react/outline";
import "./styles.scss";
export default function SearchInput({ value, name, onChange, onSubmit }) {
  return (
    <form className="search-form" method="POST" onSubmit={onSubmit}>
      <input
        type="search"
        className="search-input"
        placeholder="Digite o que procura.."
        name={name}
        value={value}
        onChange={onChange}
      />
      <button type="submit" className="search-button">
        <SearchIcon className="search-icon" aria-hidden="true" />
      </button>
    </form>
  );
}

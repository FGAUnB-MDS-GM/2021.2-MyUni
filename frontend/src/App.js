import Input from "./components/Input";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Input tipo="email" placeholder="digite aqui" titulo="Email:" />
      <Input tipo="password" placeholder="digite aqui" titulo="Senha:" />

      <Input tipo="text" placeholder="digite aqui" titulo="NOME:" />
    </div>
  );
}

export default App;

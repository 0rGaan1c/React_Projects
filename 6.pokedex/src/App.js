import Pokemons from "./components/Pokemons";
import Pokemon from "./components/Pokemon";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Pokemons} />
          <Route exact path="/:id/:name" component={Pokemon} />
          <Route render={() => <h1>Error 404!</h1>} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

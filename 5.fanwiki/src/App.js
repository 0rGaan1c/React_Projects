import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Characters from "./components/Characters/Characters";
import CharacterInfo from "./components/CharacterInfo/CharacterInfo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Characters} />
          <Route path="/:id/:page" component={CharacterInfo} />
          <Route render={() => <h1>Error 404!</h1>} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

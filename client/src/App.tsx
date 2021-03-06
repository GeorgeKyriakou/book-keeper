import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { LibraryWrapper } from "./containers/LibraryWrapper";
import { BookComponent } from "./components/Books/BookComponent";
import { BookEditor } from "./components/Books/BookEditor";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div className="app">
            <div className="main">
              <div className="router-outlet">
                <Switch>
                  <Route
                    path="/"
                    exact
                    render={() => (
                      <Link to="/books">
                        <img
                          src="https://www.thoughtco.com/thmb/wSg3B-jSZQJcTMCwUbI_P6We1fE=/4560x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/duckling-close-up-500315849-572917c93df78ced1f0b99ec.jpg"
                          className="App-logo"
                          alt="logo"
                          style={{ borderRadius: "50%", width: "13em" }}
                        />
                      </Link>
                    )}
                  ></Route>
                  <Route exact path="/books" component={LibraryWrapper}></Route>
                  <Route
                    exact
                    path="/book/details/:isn"
                    component={BookComponent}
                  ></Route>
                  <Route exact path="/book/edit" component={BookEditor}></Route>
                  <Route
                    exact
                    path="/book/edit/:isn"
                    component={BookEditor}
                  ></Route>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;

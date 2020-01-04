import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Pages
const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));
const Home = React.lazy(() => import('./Home'));



class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route path="/" name="Home" render={props => <Home {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;

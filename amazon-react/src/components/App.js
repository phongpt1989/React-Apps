import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import ProductShowPage from './ProductShowPage';
import ProductIndexPage from './ProductIndexPage';
import ProductNewPage from './ProductNewPage';
import SignInPage from './SignInPage';
import NavBar from './NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.signIn = this.signIn.bind(this);
  }

  componentWillMount() {
    this.signIn();
  }

  signIn() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      });
    }
  }
  render() {
    const { user } = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar user={user} />
          <Switch>
            <Route exact path="/products" component={ProductIndexPage} />
            <Route path="/products/new" component={ProductNewPage} />
            <Route path="/products/:id" component={ProductShowPage} />
            <Route
              path="/sign_in"
              render={props => <SignInPage {...props} onSignIn={this.signIn} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

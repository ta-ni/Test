import { Route, Switch, BrowserRouter } from 'react-router-dom';
import React from 'react';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import Header from './Header';

export default class extends React.Component {
  render() {
    return <BrowserRouter>
      <div>
      <Route component={Header}/>
      <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/" component={MainPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  }
}

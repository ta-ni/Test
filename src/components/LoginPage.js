import React from 'react';
import { connect } from 'react-redux';
import { signIn } from 'actions';
import {FormattedMessage} from 'react-intl';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setValues = this.setValues.bind(this);
  }

  setValues(fieldName, value) {
    fieldName === 'login' ?
      this.setState(() => ({login: value})) :
      this.setState(() => ({password: value}))
  }

  render() {

    let { login, password, error } = this.state;

    return (
    <div className="login-page">
      <div className="container">
        <label className="login-page__label"><FormattedMessage id="login"/></label>
        <input name="login" type="text" className="login-page__field" onChange={(e) => this.setValues(e.target.name, e.target.value)}/>
        <label className="login-page__label"><FormattedMessage id="password"/></label>
        <input name="password" type="password" className="login-page__field" onChange={(e) => {this.setValues(e.target.name, e.target.value)}}/>
      </div>
      <div className="login-page__error-block">
        {error && <div className="login-page__error"><FormattedMessage id="login.error"/></div>}
      </div>
      <button className="login-page__button" onClick={() => {
        this.props.dispatch(signIn(login, password))
          .then(() => {
            this.props.history.replace('/');
          },() => {this.setState(() => ({error: true}))})
      }}><FormattedMessage id="signin"/></button>
    </div>
    )
  }
}

LoginPage.propTypes = {
  history: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect()(LoginPage);

import React from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';
import { logout } from 'actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    let { profile } = this.props;

    return (
      <div className="header">
        <div className="container clearfix">
          {this.props.location.pathname !== '/login' &&
          (profile && profile.id ?
            <div className="header__button" onClick={() => this.props.dispatch(logout())}><FormattedMessage id="logout"/></div> :
            <div className="header__button" onClick={() => this.props.history.push('/login')}><FormattedMessage id="signin"/></div>
          )
          }
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  history: React.PropTypes.object,
  location: React.PropTypes.object,
  profile: React.PropTypes.any,
  dispatch: React.PropTypes.func,
};

export default connect((state) => ({
  profile: state.profile,
}))(Header);

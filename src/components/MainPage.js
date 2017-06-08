import React from 'react';
import { connect } from 'react-redux';
import { getPosts, sendComment } from 'actions';
import Post from './Post';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.getData = this.getData.bind(this);
  }

  componentWillMount () {
    this.getData();
  }

  getData(initialize) {
    getPosts(initialize)
      .then((posts) => this.setState(() => ({posts: posts})));
  }

  render() {

    if(!this.state.posts) {
      return null;
    }

    let { users, profile } = this.props;

    return (
    <div className="main-page">
      <div className="container">
        {this.state.posts.map((post, index) => {
          return <Post
            data={{
              post,
              users,
              profile,
              user: users.find((user) => {return user.id === post.userId}).name,
              sendComment: sendComment,
              getData: this.getData,
            }}
            key={index} />
        })}
      </div>
    </div>
    )
  }
}

MainPage.propTypes = {
  users: React.PropTypes.array,
  profile: React.PropTypes.any,
};

export default connect((state) => ({
  profile: state.profile,
  users: state.users,
}))(MainPage);

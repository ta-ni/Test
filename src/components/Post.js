import React from 'react';
import {FormattedMessage} from 'react-intl';
import { sendComment } from 'actions';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState(() => ({newComment: value}))
  }

  render() {

    let {
      data: {
      post,
      user,
      users,
      profile,
      getData,
      sendComment,
    }} = this.props;

    return (
      <div className="post">
        <div className="post__content">
          <img className="post__image" src={post.image}/>
          <p className="post__author">{user}</p>
          <div className="post__text">{post.text}</div>
        </div>
          {post.comments.map((comment, index) => {
            return <div className="post__comment-item" key={index}>
              <div className="post__comment-author">{users.find((user) => {return user.id === comment.userId}).name}</div>
              <div className="post__comment-content">{comment.text}</div>
            </div>
          })}
          {profile && profile.id && <div>
        <textarea className="post__comment-content post__comment-content_field" value={this.state.newComment} onChange={(e) => this.onChange(e.target.value)}/>
        <button className="post__button" onClick={() => {
          if(this.state.newComment) {
            sendComment({
              userId: profile.id,
              postId: post.id,
              comment: this.state.newComment})
              .then((data) => getData(data))
              .then(() => this.onChange(''))
          }
        }}><FormattedMessage id="send"/></button>
      </div>
      }
      </div>
    )
  }
}

Post.propTypes = {
  post: React.PropTypes.array,
  data: React.PropTypes.object,
};

export default Post;

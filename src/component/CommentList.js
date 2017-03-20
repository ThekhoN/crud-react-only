import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return (
        <Comment
          _id={comment['_id']}
          text={ comment.text }
          author={ comment.author }
          key={ comment['_id'] }
          handleDeleteComment={this.props.handleDeleteComment}
          handleUpdateComment={this.props.handleUpdateComment}
        />

      )
    })
    return (
      <div className='commentList'>
        { commentNodes }
      </div>
    )
  }
}

export default CommentList;

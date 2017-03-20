import React, { Component } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.onFetchComments = this.onFetchComments.bind(this);
    this.handleSubmitComments = this.handleSubmitComments.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
  }
  onFetchComments(){
    axios.get(this.props.url)
    .then(res=>{
      this.setState({
        data: res.data
      });
    });
  }
  handleUpdateComment(comment){
    //console.log('dispatched id in handleUpdateComment CommentBox: ', comment);
    //axios.put()
    const reqBody = {
      author: comment.author,
      text: comment.text
    };
    const id = comment._id;

    axios.put(`${this.props.url}/${id}`, reqBody)
    .then(res => {
      console.log('Comment updated successfully. . .');
    })
    .catch(err => {
      console.log('error in handleUpdateComment CommentBox: ', err);
    });
  }
  handleDeleteComment(id){
    console.log('dispatched id in handleDeleteComment CommentBox: ', id);

    axios.delete(`${this.props.url}/${id}`)
    .then(res => {
      console.log('Comment deleted');
    })
    .catch(err => {
      console.log('error in handleDeleteComment CommentBox: ', err);
    });
  }
  handleSubmitComments(comment){
    //we are not updating state as the polling automatically updates the state
    axios.post(this.props.url, comment)
    .then(res => {
      console.log('res on post: ', res.data);
    })
    .catch(err => {
      console.log('error in axios handleSubmitComments: ', err);
    });
  }
  componentDidMount(){
    this.onFetchComments();
    setInterval(this.onFetchComments, this.props.pollInterval);
  }
  render() {
    return (
      <div className='commentBox'>
        <h2>Comments:</h2>
      <CommentList
        handleUpdateComment={this.handleUpdateComment}
        handleDeleteComment={this.handleDeleteComment}
        data={ this.state.data }/>
      <CommentForm onSubmit={this.handleSubmitComments}/>
      </div>
    )
  }
}

export default CommentBox;

import React, { Component } from 'react';
import marked from 'marked';

class Comment extends Component {
  constructor(props){
    super(props);
    this.state = {
      updateComment: false,
      author: '',
      text: ''
    };
    this.onDeleteComment = this.onDeleteComment.bind(this);
    this.updateCommentState = this.updateCommentState.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  updateCommentState(){
    const {_id} = this.props;
    console.log('_id: ', _id);
    const {updateComment, author, text} = this.state
    if(updateComment){
      this.setState({
        author: this.authorInput.value,
        text: this.textInput.value,
        updateComment: false
      }, ()=>{
        const { author, text } = this.state;
        let dispatchComment = {
          author,
          text,
          _id
        };
        // console.log('updatedState: ', dispatchComment);
        this.props.handleUpdateComment(dispatchComment);
      });
    }
    else {
      this.setState({
        updateComment: true
      });
    }
  }
  onDeleteComment(){
    const {_id} = this.props;
    console.log('dispatch: ', _id);
    this.props.handleDeleteComment(_id);
  }
  onChangeAuthor(){
    // console.log('changing....: ', this.authorInput.value);
    this.setState({
      author: this.authorInput.value
    });
  }
  onChangeText(){
    // console.log('changing....: ', this.textInput.value);
    this.setState({
      author: this.textInput.value
    });
  }
  render() {
    const {author, text, _id} = this.props

    const {updateComment} = this.state;
    let buttonText = updateComment ? 'update': 'edit';

    return (
      <div className='comment'>
        {!updateComment && <h3 >{author}</h3>}
        {updateComment && (<label><span className='label-text'>Author:</span><br/><input
          ref={node => {this.authorInput = node}}
          onChange={this.onChangeAuthor}
          defaultValue={author}/>
        </label>)}
        {!updateComment && <span className='comment-text'>{text}</span>}
        {updateComment && (<label><span className='label-text'>Text:</span><br/><input
          ref={node => {this.textInput = node}}
          onChange={this.onChangeText}
          defaultValue={text}/>
          <br/>
        </label>)}
        <br/>
        <button onClick={this.updateCommentState}>{buttonText}</button>
        <br/>
        <br/>
        <button onClick={this.onDeleteComment}>Delete</button>
      </div>
    )
  }
}

export default Comment;

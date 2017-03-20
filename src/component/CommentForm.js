import React, { Component } from 'react';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(`${this.state.author} said "${this.state.text}"`);
    //we will be tying this into the POST method in a bit
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if(!text || !author){
      return;
    }
    this.props.onSubmit({
      author: author,
      text: text
    });
    this.setState({
      author: '',
      text: ''
    });
  }
  render() {
    return (
      <form className='commentForm' onSubmit={ this.onSubmit }>
        <input
          type='text'
          placeholder='Your name...'
          className='commentFormAuthor'
          value={ this.state.author }
          onChange={ this.handleAuthorChange } />
        <input
          type='text'
          placeholder='Say something...'
          className='commentFormText'
          value={ this.state.text }
          onChange={ this.handleTextChange } />
        <input
          type='submit'
          className='commentFormPost'
          value='Post' />
      </form>
    )
  }
}

export default CommentForm;

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, updatePost } from '../actions'


class App extends Component {
  render() {
    console.log('props', this.props)
    return (
      <div>
        Hello World
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    updatePost: (data) => dispatch(updatePost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
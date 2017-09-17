import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addComment } from '../actions'


class AddPost extends React.Component {

  state = {
    parentId: this.props.match.params.post_id,
    author: "",
    body: "",
    timestamp: Date.now(),
    id: this.generateUUID(),
  }

  generateUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  handleBodyChange(bodyInput) {
    this.setState({body: bodyInput})
  }

  handleAuthorChange(authorInput) {
    this.setState({author: authorInput})
  }

  render() {
    const { createComment, readyForRedirectHome } = this.props
    const { body, author } = this.state
    if(readyForRedirectHome) {
      return (
        <Redirect to='/' />
      )
    } else {
      return (
        <div>
          <p className="text-capitalize small">
            <Link to="/">Home</Link>
            <span className="mx-2">/</span>
            Add Comment
          </p>
          <h1 className="my-4">Add Comment</h1>
          <form className="col-6 offset-3" onSubmit={event => {
            event.preventDefault()
            createComment(this.state)
          }}>
            <div className="form-group">
              <label htmlFor="body" className="form-label">Body</label>
              <textarea className="form-control" value={body} id="body" name="body" rows="3" onChange={(event) => this.handleBodyChange(event.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="author" className="form-label">Author</label>
              <input className="form-control" type="text" value={author} id="author" name="author" onChange={(event) => this.handleAuthorChange(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )
    }
  }
}

AddPost.PropTypes = {
  createComment: PropTypes.func.isRequired,
  readyForRedirectHome: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  readyForRedirectHome: state.readyForRedirectHome,
})

const mapDispatchToProps = (dispatch) => ({
  createComment: (comment) => dispatch(addComment(comment)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddPost)
)
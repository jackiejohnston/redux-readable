import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updatePost } from '../actions'


class EditPost extends React.Component {

  state = {
    id: this.props.location.state.id,
    title: this.props.location.state.title,
    body: this.props.location.state.body
  }

  componentDidMount() {
    console.log(">>>>>>>>> EDIT POST PROPS ", this.props)
    console.log(">>>>>>>>> EDIT POST STATE ", this.state)
  }

  handleTitleChange(titleInput) {
    this.setState({title: titleInput})
  }

  handleBodyChange(bodyInput) {
    this.setState({body: bodyInput})
  }

  render() {
    const { editPost, readyForRedirectHome } = this.props
    const { id, title, body } = this.state
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
            Edit Post
          </p>
          <h1 className="my-4">Edit Post</h1>
          <form className="col-6 offset-3" onSubmit={event => {
            event.preventDefault()
            editPost(this.state)
          }}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title</label>
              <input className="form-control" type="text" value={title} id="title" name="title" onChange={(event) => this.handleTitleChange(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="body" className="form-label">Body</label>
              <textarea className="form-control" value={body} id="body" name="body" rows="3" onChange={(event) => this.handleBodyChange(event.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )
    }
  }
}

EditPost.PropTypes = {
  editPost: PropTypes.func.isRequired,
  readyForRedirectHome: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  readyForRedirectHome: state.readyForRedirectHome,
})

const mapDispatchToProps = (dispatch) => ({
  editPost: (post) => dispatch(updatePost(post)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditPost)
)
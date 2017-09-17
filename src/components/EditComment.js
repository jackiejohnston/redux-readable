import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateComment } from '../actions'


class EditComment extends React.Component {

  state = {
    id: this.props.location.state.id,
    body: this.props.location.state.body,
    timestamp: Date.now(),
  }

  handleBodyChange(bodyInput) {
    this.setState({body: bodyInput})
  }

  render() {
    const { editComment, readyForRedirectHome } = this.props
    const { body } = this.state
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
            Edit Comment
          </p>
          <h1 className="my-4">Edit Comment</h1>
          <form className="col-6 offset-3" onSubmit={event => {
            event.preventDefault()
            editComment(this.state)
          }}>
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

EditComment.PropTypes = {
  editComment: PropTypes.func.isRequired,
  readyForRedirectHome: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  readyForRedirectHome: state.readyForRedirectHome,
})

const mapDispatchToProps = (dispatch) => ({
  editComment: (comment) => dispatch(updateComment(comment)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditComment)
)
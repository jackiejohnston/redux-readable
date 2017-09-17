import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { voteOnComment, deleteComment } from '../actions'

class Comment extends React.Component {

  componentDidMount() {
    // console.log(">>>>>>>>> COMMENT PROPS ", this.props)
  }

  render() {
    const { comment, voteForComment, trashComment } = this.props
    return (
      <div key={comment.id} className="row mb-4">
        <dt className="col-sm-4 col-md-3 text-center text-nowrap">
          <button className="btn btn-link px-2" onClick={(event) => voteForComment(comment,"upVote")}>
            <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
          </button>
          <span className="text-uppercase small">
            {comment.voteScore} votes
          </span>
          <button className="btn btn-link px-2" onClick={(event) => voteForComment(comment,"downVote")}>
            <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
          </button>
        </dt>
        <dd className="col-sm-8 col-md-9">
          <span>
            {comment.body}
          </span>
          <button className="hidden-xs-up btn btn-link px-2">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className="hidden-xs-up btn btn-link px-2" onClick={(event) => trashComment(comment)}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
          <br />
          <small className="text-muted text-uppercase">
            Submitted by <strong>{comment.author}</strong> on <Moment format="MM/DD/YYYY">{comment.timestamp}</Moment>
          </small>
        </dd>
      </div>
    )
  }
}

Comment.PropTypes = {
  trashComment: PropTypes.func.isRequired,
  voteForComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  voteForComment: (comment,voteOption) => dispatch(voteOnComment(comment,voteOption)),
  trashComment: (comment) => dispatch(deleteComment(comment)),
})

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comment)
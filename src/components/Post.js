import React from 'react'
// import PropTypes from 'prop-types'
import Moment from 'react-moment';
import Comments from './Comments.js'

const Post = ({post, comments}) => (
  <dl>
    <div className="row mb-4">
      <dt className="col-sm-4 col-md-3 text-center text-nowrap">
        <button className="btn btn-link">
          <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
        </button>
        {post.voteScore} votes
        <button className="btn btn-link">
          <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
        </button>
      </dt>
      <dd className="col-sm-8 col-md-9">
        {post.body}
        <span className="badge badge-pill badge-warning ml-1 align-middle mb-1">
          {comments.filter(comment=> comment.parentId === post.id).length} comments
        </span>
        <button className="btn btn-link">
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button className="btn btn-link">
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
        <br />
        <small className="text-muted">
          Submitted by <strong>{post.author}</strong> on <Moment format="MM/DD/YYYY">{post.timestamp}</Moment>
        </small>
        <br />
          <div>
            <Comments comments={comments} />
          </div>
      </dd>
    </div>
  </dl>
)

// Posts.propTypes = {
//   posts: PropTypes.array.isRequired
// }

export default Post

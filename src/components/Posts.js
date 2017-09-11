import React from 'react'
// import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { voteOnPost } from '../actions'

const Posts = ({posts}) => (
  <dl>
    {posts.filter(post=>post.deleted === false).map((post, i) =>
      <div key={i} className="row mb-4">
        <dt className="col-sm-4 col-md-3 text-center text-nowrap">
          <button className="btn btn-link" onClick={voteOnPost(post,"upVote")}>
            <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
          </button>
          {post.voteScore} votes
          <button className="btn btn-link" onClick={voteOnPost(post,"downVote")}>
            <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
          </button>
        </dt>
        <dd className="col-sm-8 col-md-9">
          <strong>
            <a href={`/${post.category}/${post.id}`}>{post.title}</a>
          </strong>
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
        </dd>
      </div>
    )}
  </dl>
)

// Posts.propTypes = {
//   posts: PropTypes.array.isRequired
// }

export default Posts

import React from 'react'
import Moment from 'react-moment';

const Comments = ({comments, postID}) => (
  <dl>
    {comments.filter(comment=>comment.deleted === false).map((comment, i) =>
      <div key={i} className="row mb-4">
        <dt className="col-sm-4 col-md-3 text-center text-nowrap">
          <button className="btn btn-link">
            <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
          </button>
          {comment.voteScore} votes
          <button className="btn btn-link">
            <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
          </button>
        </dt>
        <dd className="col-sm-8 col-md-9">
          <strong>
            {comment.body}
          </strong>
          <button className="btn btn-link">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className="btn btn-link">
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
          <br />
          <small className="text-muted">
            Submitted by <strong>{comment.author}</strong> on <Moment format="MM/DD/YYYY">{comment.timestamp}</Moment>
          </small>
        </dd>
      </div>
    )}
  </dl>
)

export default Comments

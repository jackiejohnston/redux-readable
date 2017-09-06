import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const Posts = ({posts}) => (
  <ul className="list-unstyled">
    {posts.map((post, i) =>
      <li className="mb-4" key={i}><strong>{post.title}</strong> &ndash; {post.body}<br /><small className="text-muted">Submitted by <strong>{post.author}</strong> on <Moment format="MM/DD/YYYY">{post.timestamp}</Moment></small></li>
    )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { postsFetchData } from '../actions'

class Category extends React.Component {

  state = {
    category: ""
  }

  componentDidMount() {
    this.setState({ category: this.props.location.pathname.split("/")[1] })
    this.props.fetchPosts();
  }

  render() {
    const { posts, postsHasError, postsAreLoading } = this.props
    const { category } = this.state
    return (
      <div>
        <h1 className="mb-4 text-capitalize">{category} Posts</h1>
        {postsHasError ?
          <span>There was an error loading the posts.</span>
          : <span></span> }
        {postsAreLoading ?
          <span>Loading&hellip;</span>
          :
          <dl>
          {posts.filter(post=>post.deleted === false && post.category === category).map((post, i) =>
            <div key={i} className="row mb-4">
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
                <strong>
                  <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                </strong> &mdash; {post.body}
                <span className="badge badge-pill badge-warning ml-1 align-middle mb-1">
                  # comments
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
                <dl>
                  Comments go here
                </dl>
              </dd>
            </div>
          )}
          </dl>
        }
      </div>
    )
  }
}

Category.PropTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  postsHasError: PropTypes.bool.isRequired,
  postsAreLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  postsHasError: state.postsHasError,
  postsAreLoading: state.postsAreLoading
})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(postsFetchData())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Category)
)
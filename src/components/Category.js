import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { postsFetchData } from '../actions'
import Post from './Post'

class Category extends React.Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    const { posts, postsHasError, postsAreLoading } = this.props
    const { category } = this.props.match.params
    return (
      <div>
        <p className="text-capitalize small">
          <Link to="/">Home</Link>
          <span className="mx-2">/</span>
          {category}
        </p>
        <h1 className="my-4 text-capitalize">{category} Posts</h1>
        {postsHasError ?
          <span>There was an error loading the posts.</span>
          : <span></span> }
        {postsAreLoading ?
          <span>Loading&hellip;</span>
          :
          <dl>
          {posts.filter(post=>post.deleted === false && post.category === category).map((post) =>
            <Post key={post.id} post={post} />
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
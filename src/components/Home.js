import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postsFetchData } from '../actions'
import Post from './Post'

class Home extends React.Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, postsHasError, postsAreLoading } = this.props
    return (
      <div>
        <p className="small">Home</p>
        <h1 className="my-4">All Posts</h1>
        {postsHasError ?
          <span>There was an error loading the posts.</span>
          : <span></span> }
        {postsAreLoading ?
          <span>Loading&hellip;</span>
          :
          <dl>
          {posts.filter(post=>post.deleted === false).map((post, i) =>
            <Post key={post.id} post={post} />
          )}
          </dl>
        }
      </div>
    )
  }
}

Home.PropTypes = {
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
  )(Home)
)
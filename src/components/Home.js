import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postsFetchData, readyForRedirectHome } from '../actions'
import Post from './Post'
import SortLinks from './SortLinks'
import { getVisiblePosts } from '../utils/helpers'

class Home extends React.Component {

  componentDidMount() {
    this.props.fetchPosts()
    this.props.resetRedirect()
  }

  render() {
    const { posts, sortBy } = this.props
    const sortedPosts = getVisiblePosts(posts, sortBy)
    return (
      <div>
        <p className="small">Home</p>
        <SortLinks post={posts} />
        <h1 className="my-4">All Posts</h1>
        <dl>
        {sortedPosts.map((post, i) =>
          <Post key={post.id} post={post} />
        )}
        </dl>
      </div>
    )
  }
}

Home.PropTypes = {
  getVisiblePosts: PropTypes.func.isRequired,
  resetRedirect: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  sortBy: state.sortBy
})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(postsFetchData()),
  resetRedirect: () => dispatch(readyForRedirectHome(false)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { postsFetchData } from '../actions'
import Post from './Post'
import SortLinks from './SortLinks'
import { getVisiblePosts } from '../utils/helpers'

class Category extends React.Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    const { posts, sortBy } = this.props
    const sortedPosts = getVisiblePosts(posts, sortBy)
    const { category } = this.props.match.params
    return (
      <div>
        <p className="text-capitalize small">
          <Link to="/">Home</Link>
          <span className="mx-2">/</span>
          {category}
        </p>
        <SortLinks post={posts} />
        <h1 className="my-4 text-capitalize">{category} Posts</h1>
        <dl>
        {sortedPosts.filter(post => post.category === category).map((post) =>
          <Post key={post.id} post={post} />
        )}
        </dl>
      </div>
    )
  }
}

Category.PropTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  sortBy: state.sortBy
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
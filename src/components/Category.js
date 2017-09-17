import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { postsFetchData } from '../actions'
import Post from './Post'
import SortLinks from './SortLinks'

class Category extends React.Component {

  componentDidMount() {
     // console.log(">>>>>>>>> CATEGORY PROPS ", this.props)
    this.props.fetchPosts()
  }

  render() {
    const { posts } = this.props
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
        {posts.filter(post=>post.deleted === false && post.category === category).map((post) =>
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
}

const mapStateToProps = (state) => ({
  posts: state.posts,
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
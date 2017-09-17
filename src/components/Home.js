import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postsFetchData, readyForRedirectHome } from '../actions'
import Post from './Post'
import SortLinks from './SortLinks'

class Home extends React.Component {

  componentDidMount() {
     // console.log(">>>>>>>>> HOME PROPS ", this.props)
    this.props.fetchPosts()
    this.props.resetRedirect()
  }

  render() {
    const { posts } = this.props
    return (
      <div>
        <p className="small">Home</p>
        <SortLinks post={posts} />
        <h1 className="my-4">All Posts</h1>
        <dl>
        {posts.filter(post=>post.deleted === false).map((post, i) =>
          <Post key={post.id} post={post} />
        )}
        </dl>
      </div>
    )
  }
}

Home.PropTypes = {
  resetRedirect: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  posts: state.posts,
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
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postsFetchData } from '../actions'
import Post from './Post'

class Home extends React.Component {

  componentDidMount() {
     console.log(">>>>>>>>> HOME PROPS ", this.props)
    this.props.fetchPosts();
  }

  render() {
    const { posts, sortScoreHighestFirst } = this.props
    return (
      <div>
        <button className="hidden-xs-up" onClick={(event) => sortScoreHighestFirst()}>Sort</button>
        <p className="small">Home</p>
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
  // sortScoreHighestFirst: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  posts: state.posts,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(postsFetchData()),
  // sortScoreHighestFirst: () => dispatch(sortByScoreAndRefresh())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)
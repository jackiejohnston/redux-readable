import React from 'react'
// import PropTypes from 'prop-types'
import { withRouter, Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCategory, selectPost, fetchPostsIfNeeded, fetchCommentsIfNeeded, voteOnPost } from '../actions'
import * as ReadableAPI from '../utils/api.js'
import Posts from './Posts.js'
import Post from './Post.js'
import Comments from './Comments.js'


class App extends React.Component {

  // static propTypes = {
  //   selectedCategory: PropTypes.string.isRequired,
  //   posts: PropTypes.array.isRequired,
  //   isFetching: PropTypes.bool.isRequired,
  //   dispatch: PropTypes.func.isRequired
  // }

  state = {
    categories: []
  }

  getCategories() {
    ReadableAPI.getCategories().then((categories) => {
      this.setState({ categories })
    })
  }

  componentDidMount() {
    this.getCategories()

    const { dispatch, selectedCategory } = this.props
    dispatch(fetchPostsIfNeeded(selectedCategory))
  }

  getCategoryFromPath(path) {
    const { dispatch, selectedPost } = this.props
    if (path === "/") {
      return "all"
    } else if (path.split("/").length === 2) {
      dispatch(selectPost(null))
      return path.split("/")[1]
    } else {
      // get comments, filter posts, show details
      const postID = path.split("/")[2]
      dispatch(selectPost(postID))
      dispatch(fetchCommentsIfNeeded(selectedPost))
      return path.split("/")[1]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCategory !== this.props.selectedCategory) {
      const { dispatch, selectedCategory } = nextProps
      dispatch(fetchPostsIfNeeded(selectedCategory))
    }
  }

  render() {
    const { categories } = this.state
    const { posts, comments, isFetching, isFetchingComments, selectedPost, dispatch } = this.props
    const isEmpty = posts.length === 0
    dispatch(selectCategory(this.getCategoryFromPath(this.props.location.pathname)))

    return (
      <div>
        <div className="container-fluid bg-inverse mb-5">
          <div className="container px-0">
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse px-0">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link className="navbar-brand" to="/">Readable</Link>
              <div className="collapse navbar-collapse" id="navbar">
                <div className="navbar-nav">
                  {categories.map(category => (
                    <Link to={`/${category.path}`} key={category.name} className="nav-item nav-link">{category.name}</Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">

              <Switch>
                <Route exact path='/' render={() => (
                  <div>
                    <h1 className="mb-4">All Posts</h1>
                    <Posts posts={posts}  />
                  </div>
                )}/>


                {categories.map(category => (
                  <Route key={category.name} exact path={`/${category.path}`} render={() => (
                    <div>
                      <h1 className="text-capitalize mb-4">{category.name} Posts</h1>
                      <Posts posts={posts}  />
                    </div>
                  )}/>
                ))}


                {posts.filter(post=>post.deleted === false).map((post, i) =>
                  <Route key={post.id} exact path={`/${post.category}/${post.id}`}
                  render={() => (
                    <div>
                      <h1 className="text-capitalize mb-4">{post.title}</h1>
                      <Post post={post} comments={comments}  />
                    </div>
                  )}/>
                )}

              </Switch>


              {isEmpty
                ? (isFetching ? <h6>Loading...</h6> : <h6>Empty.</h6>)
                : <span></span>
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}


// function mapDispatchToProps(dispatch) {
//   return {
//     fetchPosts: (data) => dispatch(fetchPosts(data)),
//     addPost: (data) => dispatch(addPost(data)),
//     updatePost: (data) => dispatch(updatePost(data)),
//   }
// }


const mapStateToProps = state => {
  const { selectedCategory, selectedPost, postsByCategory, commentsByPost } = state
  const {
    isFetching,
    items: posts
  } = postsByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }
  const {
    isFetchingComments,
    items: comments
  } = commentsByPost[selectedPost] || {
    isFetchingComments: true,
    items: []
  }

  return {
    selectedCategory,
    selectedPost,
    posts,
    comments,
    isFetching,
    isFetchingComments
  }
}

export default withRouter(
  connect(
    // mapDispatchToProps,
    mapStateToProps,
  )(App)
)
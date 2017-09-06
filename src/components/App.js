import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCategory, fetchPostsIfNeeded } from '../actions'
import * as ReadableAPI from '../utils/api.js'
import Posts from './Posts.js'


class App extends React.Component {

  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

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
    switch(path) {
      case '/':
        return 'all'
        break
      default:
        return path.replace('/','')

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
    const { selectedCategory, posts, isFetching, dispatch } = this.props
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
            <div className="col-xs-12">

              <Switch>
                <Route exact path='/' render={() => (
                  <div>
                    <h1 className="mb-4">All Posts</h1>
                  </div>
                )}/>


                {categories.map(category => (
                  <Route key={category.name} exact path={`/${category.path}`} render={() => (
                    <div>
                      <h1 className="text-capitalize mb-4">{category.name} Posts</h1>
                    </div>
                  )}/>
                ))}


              </Switch>


              {isEmpty
                ? (isFetching ? <h4>Loading...</h4> : <h4>Empty.</h4>)
                : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts} />
                  </div>
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
  const { selectedCategory, postsByCategory } = state
  const {
    isFetching,
    items: posts
  } = postsByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }

  return {
    selectedCategory,
    posts,
    isFetching
  }
}

export default withRouter(
  connect(
    // mapDispatchToProps,
    mapStateToProps,
  )(App)
)
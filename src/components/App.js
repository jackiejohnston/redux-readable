import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, updatePost } from '../actions'
import * as ReadableAPI from '../utils/api.js'


class App extends React.Component {

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
  }

  render() {
    // console.log('props', this.props)
    const { categories } = this.state



    return (
      <div>
        <Switch>
          <Route exact path='/' render={() => (
            <div>
              <h1>Home</h1>
              <ul>
              {categories.map(category => (
                <li key={category.name}>
                  <Link to={`/${category.path}`}>{category.name}</Link>
                </li>
              ))}
              </ul>
            </div>
          )}/>


          {categories.map(category => (
            <Route key={category.name} exact path={`/${category.path}`} render={() => (
              <div>
                <h1>{category.name}</h1>
              </div>
            )}/>
          ))}


        </Switch>

      </div>
    )
  }
}


function mapStateToProps({ posts, comments }) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    updatePost: (data) => dispatch(updatePost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
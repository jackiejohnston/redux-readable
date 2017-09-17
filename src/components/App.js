import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { categoriesFetchData } from '../actions'
import Header from './Header'
import Home from './Home'
import Category from './Category'
import Detail from './Detail'
import AddPost from './AddPost'
import EditPost from './EditPost'
import AddComment from './AddComment'
import EditComment from './EditComment'

class App extends React.Component {

  componentDidMount() {
    this.props.fetchCategories()
    // console.log(">>>>>>>>> APP PROPS ", this.props)
  }

  render() {
    const { categories } = this.props

    return (
      <div>
        <Header categories={categories} />
        <div className="container">
          <div className="row">
            <div className="col">

              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path="/add-post" component={AddPost} />
                <Route exact path="/edit-post" component={EditPost} />
                <Route exact path="/edit-comment" component={EditComment} />
                <Route exact path="/add-comment/:post_id" component={AddComment} />
                <Route exact path="/:category" component={Category} />
                <Route exact path="/:category/:post_id" component={Detail} />
              </Switch>

            </div>
          </div>
        </div>


      </div>
    )
  }
}

App.PropTypes = {
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  categories: state.categories,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(categoriesFetchData())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
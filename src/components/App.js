import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { categoriesFetchData } from '../actions'
import Header from './Header'
import Home from './Home'
import Category from './Category'

class App extends React.Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories, categoriesHasError, categoriesAreLoading } = this.props

    return (
      <div>
        <Header categories={categories} categoriesHasError={categoriesHasError} categoriesAreLoading={categoriesAreLoading} />
        <div className="container">
          <div className="row">
            <div className="col">

              <Switch>
                <Route exact path='/' component={Home} />
                {categories.map(category => (
                  <Route key={category.name} exact path={`/${category.path}`} component={Category} />
                ))}
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
  categoriesHasError: PropTypes.bool.isRequired,
  categoriesAreLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  categoriesHasError: state.categoriesHasError,
  categoriesAreLoading: state.categoriesAreLoading
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
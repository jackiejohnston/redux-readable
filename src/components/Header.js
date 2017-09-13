import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({categories, categoriesHasError, categoriesAreLoading}) => (
  <div className="container-fluid bg-inverse mb-5">
    <div className="container px-0">
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse px-0">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">Readable</Link>
        <div className="collapse navbar-collapse" id="navbar">
          <div className="navbar-nav">
            {categoriesHasError ?
              <span>There was an error loading the categories.</span>
              : <span></span> }
            {categoriesAreLoading ?
              <span>Loading&hellip;</span>
              :
              categories.map(category => (
                <Link to={`/${category.path}`} key={category.name} className="nav-item nav-link">{category.name}</Link>
              ))
            }
          </div>
        </div>
      </nav>
    </div>
  </div>
)

Header.PropTypes = {
  categories: PropTypes.array.isRequired,
  categoriesHasError: PropTypes.bool.isRequired,
  categoriesAreLoading: PropTypes.bool.isRequired
}

export default Header
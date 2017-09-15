import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({categories, categoriesHasError, categoriesAreLoading}) => (
  <div className="container-fluid bg-inverse mb-2">
    <div className="container">
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse px-0">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">Readable</Link>
        <div className="collapse navbar-collapse" id="navbar">
          <div className="navbar-nav text-capitalize">
            {categories.map(category => (
                <Link to={`/${category.path}`} key={category.name} className="nav-item nav-link">{category.name}</Link>
              ))
            }
          </div>
        </div>
        <div className="navbar-nav justify-content-end">
          <Link to="/add-post" className="nav-item nav-link text-nowrap">Add Post</Link>
        </div>
      </nav>
    </div>
  </div>
)

Header.PropTypes = {
  categories: PropTypes.array.isRequired,
}

export default Header
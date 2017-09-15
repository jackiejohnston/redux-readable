import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { categoriesFetchData } from '../actions'

class AddPost extends React.Component {

  componentDidMount() {
    this.props.fetchCategories()
    console.log(">>>>>>>>> ADDPOST PROPS ", this.props)
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        <p className="text-capitalize small">
          <Link to="/">Home</Link>
          <span className="mx-2">/</span>
          Add Post
        </p>
        <h1 className="my-4">Add Post</h1>
        <select>
          <option value="none" disabled>Select category&hellip;</option>
          {categories.map(category => (
              <option value={category.name}>{category.name}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

AddPost.PropTypes = {
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
  )(AddPost)
)
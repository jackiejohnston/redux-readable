import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { categoriesFetchData, addPost } from '../actions'


class AddPost extends React.Component {

  state = {
    title: "",
    author: "",
    body: "",
    category: "",
    timestamp: Date.now(),
    id: this.generateUUID(),
  }

  componentDidMount() {
    console.log(">>>>>>>>> ADD POST PROPS ", this.props)
    this.props.fetchCategories()
  }

  generateUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  handleTitleChange(titleInput) {
    this.setState({title: titleInput})
  }

  handleBodyChange(bodyInput) {
    this.setState({body: bodyInput})
  }

  handleAuthorChange(authorInput) {
    this.setState({author: authorInput})
  }

  handleCategoryChange(categorySelect) {
    this.setState({category: categorySelect})
  }

  render() {
    const { categories, createPost, readyForRedirectHome } = this.props
    const { title, body, author } = this.state
    if(readyForRedirectHome) {
      return (
        <Redirect to='/' />
      )
    } else {
      return (
        <div>
          <p className="text-capitalize small">
            <Link to="/">Home</Link>
            <span className="mx-2">/</span>
            Add Post
          </p>
          <h1 className="my-4">Add Post</h1>
          <form className="col-6 offset-3" onSubmit={event => {
            event.preventDefault()
            createPost(this.state)
          }}>
            <div className="form-group">
              <label for="category">Category</label>
              <select id="category" className="form-control" onChange={(event) => this.handleCategoryChange(event.target.value)}>
                  <option value="" selected="selected">Pick category&hellip;</option>
                {categories.map(category => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <label for="title" className="form-label">Title</label>
              <input className="form-control" type="text" value={title} id="title" name="title" onChange={(event) => this.handleTitleChange(event.target.value)} />
            </div>
            <div className="form-group">
              <label for="body" className="form-label">Body</label>
              <textarea className="form-control" value={body} id="body" name="body" rows="3" onChange={(event) => this.handleBodyChange(event.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label for="author" className="form-label">Author</label>
              <input className="form-control" type="text" value={author} id="author" name="author" onChange={(event) => this.handleAuthorChange(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )
    }
  }
}

AddPost.PropTypes = {
  fetchCategories: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  readyForRedirectHome: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  readyForRedirectHome: state.readyForRedirectHome,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(categoriesFetchData()),
  createPost: (post) => dispatch(addPost(post)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddPost)
)
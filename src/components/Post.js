import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { commentsFetchData } from '../actions'

class Post extends React.Component {

  componentDidMount() {
    // console.log(">>>>>>>>> POST PROPS ", this.props)
    const { fetchComments, post } = this.props
    fetchComments(post.id)
  }

  render() {
    const { post, comments } = this.props
    const { path } = this.props.match
    return (
      <div key={post.id} className="row mb-4">
        <dt className="col-sm-4 col-md-3 text-center text-nowrap">
          <button className="btn btn-link px-2">
            <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
          </button>
          <span className="text-uppercase small">
            {post.voteScore} votes
          </span>
          <button className="btn btn-link px-2">
            <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
          </button>
        </dt>
        <dd className="col-sm-8 col-md-9">
          <strong>
            {path === "/:category/:post_id" ?
              <span>{post.title}</span>
            :
              <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
            }
          </strong>
          <Link to={`/${post.category}`} className="badge badge-pill badge-primary mx-2 text-uppercase align-middle mb-1">
            {post.category}
          </Link>
          <span className="badge badge-pill badge-warning ml-1 align-middle mb-1 text-uppercase">
            {comments.filter(comment=>comment.parentId === post.id && comment.deleted === false).length} comments
          </span>
          <button className="btn btn-link px-2">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className="btn btn-link px-2">
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
          {path === "/:category/:post_id" ?
            <p className="mb-2">{post.body}</p>
            :
            <div></div>
          }
          <small className="text-muted text-uppercase">
            Submitted by <strong>{post.author}</strong> on <Moment format="MM/DD/YYYY">{post.timestamp}</Moment>
          </small>
          <dl className="mt-4">
            {comments.filter(comment=>comment.parentId === post.id && comment.deleted === false).map((comment, i) =>
              <div key={i} className="row mb-4">
                <dt className="col-sm-4 col-md-3 text-center text-nowrap">
                  <button className="btn btn-link px-2">
                    <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
                  </button>
                  <span className="text-uppercase small">
                    {comment.voteScore} votes
                  </span>
                  <button className="btn btn-link px-2">
                    <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
                  </button>
                </dt>
                <dd className="col-sm-8 col-md-9">
                  <span>
                    {comment.body}
                  </span>
                  <button className="btn btn-link px-2">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-link px-2">
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                  <br />
                  <small className="text-muted text-uppercase">
                    Submitted by <strong>{comment.author}</strong> on <Moment format="MM/DD/YYYY">{comment.timestamp}</Moment>
                  </small>
                </dd>
              </div>
            )}
          </dl>
        </dd>
      </div>
    )
  }
}

Post.PropTypes = {
  fetchComments: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  comments: state.comments
})

const mapDispatchToProps = (dispatch) => ({
  fetchComments: (data) => dispatch(commentsFetchData(data))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
)
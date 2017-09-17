import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postSortByScoreDesc, postSortByScoreAsc, postSortByTimeDesc, postSortByTimeAsc } from '../actions'

class Home extends React.Component {

  componentDidMount() {
     console.log(">>>>>>>>> SORT LINKS PROPS ", this.props)
  }

  render() {
    const { posts, sortScoreHighestFirst, sortScoreLowestFirst, sortTimeHighestFirst, sortTimeLowestFirst } = this.props
    return (
      <span className="float-right">
        Sort by: <button className="btn btn-link" onClick={(event) => sortScoreHighestFirst(posts)}><i className="fa fa-arrow-circle-up" aria-hidden="true"></i></button> Votes <button className="btn btn-link" onClick={(event) => sortScoreLowestFirst(posts)}><i className="fa fa-arrow-circle-down" aria-hidden="true"></i></button> | <button className="btn btn-link" onClick={(event) => sortTimeHighestFirst(posts)}><i className="fa fa-arrow-circle-up" aria-hidden="true"></i></button> Date <button className="btn btn-link" onClick={(event) => sortTimeLowestFirst(posts)}><i className="fa fa-arrow-circle-down" aria-hidden="true"></i></button>
      </span>
    )
  }
}

Home.PropTypes = {
  sortScoreHighestFirst: PropTypes.func.isRequired,
  sortScoreLowestFirst: PropTypes.func.isRequired,
  sortTimeHighestFirst: PropTypes.func.isRequired,
  sortTimeLowestFirst: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  posts: state.posts,
})

const mapDispatchToProps = (dispatch) => ({
  sortScoreHighestFirst: (posts) => dispatch(postSortByScoreDesc(posts)),
  sortScoreLowestFirst: (posts) => dispatch(postSortByScoreAsc(posts)),
  sortTimeHighestFirst: (posts) => dispatch(postSortByTimeDesc(posts)),
  sortTimeLowestFirst: (posts) => dispatch(postSortByTimeAsc(posts))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
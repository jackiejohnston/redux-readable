import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sortBy } from '../actions'

class SortLinks extends React.Component {

  render() {
    const { changeSort } = this.props
    return (
      <span className="float-right">
        Sort by: <button className="btn btn-link" onClick={(event) => changeSort("scoreAsc")}><i className="fa fa-arrow-circle-up" aria-hidden="true"></i></button> Votes <button className="btn btn-link" onClick={(event) => changeSort("scoreDesc")}><i className="fa fa-arrow-circle-down" aria-hidden="true"></i></button> | <button className="btn btn-link" onClick={(event) => changeSort("timeAsc")}><i className="fa fa-arrow-circle-up" aria-hidden="true"></i></button> Date <button className="btn btn-link" onClick={(event) => changeSort("timeDesc")}><i className="fa fa-arrow-circle-down" aria-hidden="true"></i></button>
      </span>
    )
  }
}

SortLinks.PropTypes = {
  changeSort: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  sortType: state.sortType,
})

const mapDispatchToProps = (dispatch) => ({
  changeSort: (sortType) => dispatch(sortBy(sortType))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortLinks)
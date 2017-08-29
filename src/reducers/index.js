import { combineReducers } from 'redux'

import {
  ADD_POST,
  UPDATE_POST,
  VOTE_ON_POST,
  DELETE_POST,
  ADD_COMMENT,
  UPDATE_COMMENT,
  VOTE_ON_COMMENT,
  DELETE_COMMENT,
} from '../actions'

function posts (state = {}, action) {
  const { title, body, author, category, option } = action

  switch (action.type) {
    case ADD_POST :
      const { post } = action
      return {
        ...state,
        [post.id]: post
      }
      //     {
      //       id: generateUUID(),
      //       timestamp: Date.now(),
      //       title: action.title,
      //       body: action.body,
      //       author: action.author,
      //       category: action.category,
      //       voteScore: 0,
      //       deleted: false
      //     }
      //   ]
      // }
    case UPDATE_POST :
      return {}
    case VOTE_ON_POST :
      return {}
    case DELETE_POST :
      return {}
    default:
      return state
  }
}

function comments (state = {}, action) {
  const { body, author, option, parentId } = action

  switch (action.type) {
    case ADD_COMMENT :
      const { comment } = action
      return {
        ...state,
        [comment.id]: comment
      }
    case UPDATE_COMMENT :
      return {}
    case VOTE_ON_COMMENT :
      return {}
    case DELETE_COMMENT :
      return {}
    default:
      return state
  }
}


export default combineReducers({
  posts,
  comments,
});
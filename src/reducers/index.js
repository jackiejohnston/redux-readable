import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,
  SELECT_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
} from '../actions'

const selectedCategory = (state = 'all', action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

const selectedPost = (state = null, action) => {
  switch (action.type) {
    case SELECT_POST:
      return action.postID
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      }
    default:
      return state
  }
}

const comments = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        isFetching: false,
        items: action.comments
      }
    default:
      return state
  }
}

const postsByCategory = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.category]: posts(state[action.category], action)
      }
    default:
      return state
  }
}

const commentsByPost = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
    case REQUEST_COMMENTS:
      return {
        ...state,
        [action.postID]: comments(state[action.postID], action)
      }
    default:
      return state
  }
}



const rootReducer = combineReducers({
  postsByCategory,
  commentsByPost,
  selectedCategory,
  selectedPost
})

export default rootReducer



// import { combineReducers } from 'redux'

// import {
//   RECEIVE_POSTS,
//   ADD_POST,
//   UPDATE_POST,
//   VOTE_ON_POST,
//   DELETE_POST,
//   ADD_COMMENT,
//   UPDATE_COMMENT,
//   VOTE_ON_COMMENT,
//   DELETE_COMMENT,
// } from '../actions'

// function posts (state = {}, action) {
//   const { title, body, author, category, option } = action

//   switch (action.type) {
//     case RECEIVE_POSTS :
//       const { posts } = action
//       return {
//         ...state,
//         posts
//       }
//     case ADD_POST :
//       const { post } = action
//       return {
//         ...state,
//         [post.id]: post
//       }
//       //     {
//       //       id: generateUUID(),
//       //       timestamp: Date.now(),
//       //       title: action.title,
//       //       body: action.body,
//       //       author: action.author,
//       //       category: action.category,
//       //       voteScore: 0,
//       //       deleted: false
//       //     }
//       //   ]
//       // }
//     case UPDATE_POST :
//       return {}
//     case VOTE_ON_POST :
//       return {}
//     case DELETE_POST :
//       return {}
//     default:
//       return state
//   }
// }

// function comments (state = {}, action) {
//   const { body, author, option, parentId } = action

//   switch (action.type) {
//     case ADD_COMMENT :
//       const { comment } = action
//       return {
//         ...state,
//         [comment.id]: comment
//       }
//     case UPDATE_COMMENT :
//       return {}
//     case VOTE_ON_COMMENT :
//       return {}
//     case DELETE_COMMENT :
//       return {}
//     default:
//       return state
//   }
// }


// export default combineReducers({
//   posts,
//   comments,
// });
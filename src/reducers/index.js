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

const initialState = {
  posts: [],
  comments: []
}

function generateUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

function reads (state = initialState, action) {
  const { title, body, author, category, option, parentId } = action

  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        posts: [...state.posts,
          {
            id: generateUUID(),
            timestamp: Date.now(),
            title: action.title,
            body: action.body,
            author: action.author,
            category: action.category,
            voteScore: 0,
            deleted: false
          }
        ]
      }
    case UPDATE_POST :
      return {}
    case VOTE_ON_POST :
      return {}
    case DELETE_POST :
      return {}
    case ADD_COMMENT :
      return {}
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


export default reads
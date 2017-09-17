import { combineReducers } from 'redux'

// GET /categories
// Get all of the categories available for the app.

export function fetchCategoriesHasError(state = false, action) {
  switch(action.type) {
    case 'FETCH_CATEGORIES_HAS_ERROR':
      return action.categoriesHasError
    default:
      return state
  }
}

export function fetchCategoriesIsLoading(state = false, action) {
  switch(action.type) {
    case 'FETCH_CATEGORIES_IS_LOADING':
      return action.categoriesAreLoading
    default:
      return state
  }
}

export function categories(state = [], action) {
  switch(action.type) {
    case 'FETCH_CATEGORIES_HAS_SUCCESS':
      return action.categories
    default:
      return state
  }
}

// Sorting functions

export function sortByTimeAsc(a, b){
  let aTime = a.timestamp;
  let bTime = b.timestamp;
  return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
}

export function sortByTimeDesc(a, b){
  let aTime = a.timestamp;
  let bTime = b.timestamp;
  return ((aTime > bTime) ? -1 : ((aTime < bTime) ? 1 : 0));
}

export function sortByScoreAsc(a, b){
  let aScore = a.voteScore;
  let bScore = b.voteScore;
  return ((aScore < bScore) ? -1 : ((aScore > bScore) ? 1 : 0));
}

export function sortByScoreDesc(a, b){
  let aScore = a.voteScore;
  let bScore = b.voteScore;
  return ((aScore > bScore) ? -1 : ((aScore < bScore) ? 1 : 0));
}

// GET /posts
// Get all of the posts. Useful for the main page when no category is selected.

export function fetchPostsHasError(state = false, action) {
  switch(action.type) {
    case 'FETCH_POSTS_HAS_ERROR':
      return action.postsHasError
    default:
      return state
  }
}

export function fetchPostsIsLoading(state = false, action) {
  switch(action.type) {
    case 'FETCH_POSTS_IS_LOADING':
      return action.postsAreLoading
    default:
      return state
  }
}

export function posts(state = [], action) {
  switch(action.type) {
    case 'FETCH_POSTS_HAS_SUCCESS':
      return action.posts
    case 'POST_SORT_BY_SCORE_DESC':
      const postsByScoreDesc = action.posts.sort(sortByScoreDesc)
      return postsByScoreDesc
    case 'POST_SORT_BY_SCORE_ASC':
      const postsByScoreAsc = action.posts.sort(sortByScoreAsc)
      return postsByScoreAsc
    case 'POST_SORT_BY_TIME_DESC':
      const postsByTimeDesc = action.posts.sort(sortByTimeDesc)
      return postsByTimeDesc
    case 'POST_SORT_BY_TIME_ASC':
      const postsByTimeAsc = action.posts.sort(sortByTimeAsc)
      return postsByTimeAsc
    default:
      return state
  }
}

// GET /posts/:id/comments
// Get all the comments for a single post.

export function fetchCommentsHasError(state = false, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS_HAS_ERROR':
      return action.commentsHasError
    default:
      return state
  }
}

export function fetchCommentsIsLoading(state = false, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS_IS_LOADING':
      return action.commentsAreLoading
    default:
      return state
  }
}

export function comments(state = [], action) {
  switch(action.type) {
    case 'FETCH_COMMENTS_HAS_SUCCESS':
      if (action.comments.length) {
        const merge = (a, b, p) => a.filter( aa => ! b.find ( bb => aa[p] === bb[p]) ).concat(b)
        return merge(state, action.comments, "id")
      } else {
        return action.comments
      }
    case 'UPDATE_COMMENT_AS_DELETED':
      const updatedComments = action.comments.map(
          (comment) => comment.id === action.comment.id ? {...comment, deleted: true} : comment
        )
      return updatedComments
    default:
      return state
  }
}

// Redirect
export function readyForRedirectHome(state = false, action) {
  switch(action.type) {
    case 'READY_FOR_REDIRECT_HOME':
      return action.redirectHome
    default:
      return state
  }
}


const rootReducer = combineReducers({
  categories,
  fetchCategoriesHasError,
  fetchCategoriesIsLoading,
  posts,
  fetchPostsHasError,
  fetchPostsIsLoading,
  comments,
  fetchCommentsHasError,
  fetchCommentsIsLoading,
  readyForRedirectHome
})

export default rootReducer
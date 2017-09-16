import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

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
    default:
      return state
  }
}

// Sorting functions

// function sortByTimeAsc(a, b){
//   var aTime = a.timestamp;
//   var bTime = b.timestamp;
//   return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
// }
// function sortByTimeDesc(a, b){
//   var aTime = a.timestamp;
//   var bTime = b.timestamp;
//   return ((aTime > bTime) ? -1 : ((aTime < bTime) ? 1 : 0));
// }
// function sortByScoreAsc(a, b){
//   var aScore = a.voteScore;
//   var bScore = b.voteScore;
//   return ((aScore < bScore) ? -1 : ((aScore > bScore) ? 1 : 0));
// }
// function sortByScoreDesc(a, b){
//   var aScore = a.voteScore;
//   var bScore = b.voteScore;
//   return ((aScore > bScore) ? -1 : ((aScore < bScore) ? 1 : 0));
// }

// export function postSortByScoreDesc(state = [], action) {
//   switch(action.type) {
//     case 'POST_SORT_BY_SCORE_DESC':
//       return action.posts.sort(sortByScoreDesc)
//     default:
//       return state
//   }
// }


const rootReducer = combineReducers({
  router: routerReducer,
  categories,
  fetchCategoriesHasError,
  fetchCategoriesIsLoading,
  posts,
  fetchPostsHasError,
  fetchPostsIsLoading,
  comments,
  fetchCommentsHasError,
  fetchCommentsIsLoading,
  // postSortByScoreDesc,
})

export default rootReducer
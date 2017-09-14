import { combineReducers } from 'redux'

// GET /categories
// Get all of the categories available for the app.

export function fetchCategoriesHasError(state = false, action) {
  switch(action.type) {
    case 'FETCH_CATEGORIES_HAS_ERROR':
      return action.categoriesHasError;
    default:
      return state;
  }
}

export function fetchCategoriesIsLoading(state = false, action) {
  switch(action.type) {
    case 'FETCH_CATEGORIES_IS_LOADING':
      return action.categoriesAreLoading;
    default:
      return state;
  }
}

export function categories(state = [], action) {
  switch(action.type) {
    case 'FETCH_CATEGORIES_HAS_SUCCESS':
      return action.categories;
    default:
      return state;
  }
}

// GET /posts
// Get all of the posts. Useful for the main page when no category is selected.

export function fetchPostsHasError(state = false, action) {
  switch(action.type) {
    case 'FETCH_POSTS_HAS_ERROR':
      return action.postsHasError;
    default:
      return state;
  }
}

export function fetchPostsIsLoading(state = false, action) {
  switch(action.type) {
    case 'FETCH_POSTS_IS_LOADING':
      return action.postsAreLoading;
    default:
      return state;
  }
}

export function posts(state = [], action) {
  switch(action.type) {
    case 'FETCH_POSTS_HAS_SUCCESS':
      return action.posts;
    default:
      return state;
  }
}

// GET /posts/:id/comments
// Get all the comments for a single post.

export function setSelectedPostID(state = "", action) {
  switch(action.type) {
    case 'SET_SELECTED_POST_ID':
      return action.selectedPostID;
    default:
      return state;
  }
}

export function fetchCommentsHasError(state = false, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS_HAS_ERROR':
      return action.commentsHasError;
    default:
      return state;
  }
}

export function fetchCommentsIsLoading(state = false, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS_IS_LOADING':
      return action.commentsAreLoading;
    default:
      return state;
  }
}

export function comments(state = [], action) {
  switch(action.type) {
    case 'FETCH_COMMENTS_HAS_SUCCESS':
      return action.comments;
    default:
      return state;
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
  setSelectedPostID
})

export default rootReducer
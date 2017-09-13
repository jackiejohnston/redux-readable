import { combineReducers } from 'redux'

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

const rootReducer = combineReducers({
  categories,
  fetchCategoriesHasError,
  fetchCategoriesIsLoading,
  posts,
  fetchPostsHasError,
  fetchPostsIsLoading
})

export default rootReducer
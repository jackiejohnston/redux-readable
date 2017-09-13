const api = 'http://localhost:5001'
const key = 'whatever-you-want'
const headers = {
  'Accept': 'application/json',
  'Authorization': key,
  'Content-Type': 'application/json',
}

// GET /categories
// USAGE:
// Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.

export function fetchCategoriesHasError(bool) {
  return {
    type: 'FETCH_CATEGORIES_HAS_ERROR',
    categoriesHasError: bool
  }
}

export function fetchCategoriesIsLoading(bool) {
  return {
    type: 'FETCH_CATEGORIES_IS_LOADING',
    categoriesAreLoading: bool
  }
}

export function fetchCategoriesHasSuccess(categories) {
  return {
    type: 'FETCH_CATEGORIES_HAS_SUCCESS',
    categories
  }
}

export function categoriesFetchData() {
  return (dispatch) => {
    dispatch(fetchCategoriesIsLoading(true));
    fetch(`${api}/categories`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        dispatch(fetchCategoriesIsLoading(false))
        return response
      })
      .then((response) => response.json())
      .then((data) => dispatch(fetchCategoriesHasSuccess(data.categories)))
      .catch(() => dispatch(fetchCategoriesHasError(true)))
  }
}


// GET /posts
// USAGE:
// Get all of the posts. Useful for the main page when no category is selected.


export function fetchPostsHasError(bool) {
  return {
    type: 'FETCH_POSTS_HAS_ERROR',
    postsHasError: bool
  }
}

export function fetchPostsIsLoading(bool) {
  return {
    type: 'FETCH_POSTS_IS_LOADING',
    postsAreLoading: bool
  }
}

export function fetchPostsHasSuccess(posts) {
  return {
    type: 'FETCH_POSTS_HAS_SUCCESS',
    posts
  }
}

export function postsFetchData() {
  return (dispatch) => {
    dispatch(fetchPostsIsLoading(true));
    fetch(`${api}/posts`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        dispatch(fetchPostsIsLoading(false))
        return response
      })
      .then((response) => response.json())
      .then((data) => dispatch(fetchPostsHasSuccess(data)))
      .catch(() => dispatch(fetchPostsHasError(true)))
  }
}
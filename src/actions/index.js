const api = 'http://localhost:5001'
const key = 'whatever-you-want'
const headers = {
  'Accept': 'application/json',
  'Authorization': key,
  'Content-Type': 'application/json',
}

// Sorting functions

export function postSortByScoreDesc(posts){
  return {
    type: 'POST_SORT_BY_SCORE_DESC',
    posts
  }
}

// GET /categories
// Get all of the categories available for the app.

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
    dispatch(fetchCategoriesIsLoading(true))
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
    dispatch(fetchPostsIsLoading(true))
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


// GET /posts/:id/comments
// Get all the comments for a single post.


export function fetchCommentsHasError(bool) {
  return {
    type: 'FETCH_COMMENTS_HAS_ERROR',
    commentsHasError: bool
  }
}

export function fetchCommentsIsLoading(bool) {
  return {
    type: 'FETCH_COMMENTS_IS_LOADING',
    commentsAreLoading: bool
  }
}

export function fetchCommentsHasSuccess(comments) {
  return {
    type: 'FETCH_COMMENTS_HAS_SUCCESS',
    comments
  }
}

export function commentsFetchData(post_id) {
  return (dispatch, getState) => {
    dispatch(fetchCommentsIsLoading(true))
    fetch(`${api}/posts/${post_id}/comments`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        dispatch(fetchCommentsIsLoading(false))
        return response
      })
      .then((response) => response.json())
      .then((data) => dispatch(fetchCommentsHasSuccess(data)))
      .catch(() => dispatch(fetchCommentsHasError(true)))
  }
}
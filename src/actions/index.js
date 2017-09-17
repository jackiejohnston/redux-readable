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


// export function sortByScoreAndRefresh(posts) {
//   return (dispatch) => {
//     postSortByScoreDesc(posts).then(() => {return dispatch(postsFetchData())})
//   }
// }

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


// POST /posts/:id
// Used for voting on a post.
// option - [String]: Either "upVote" or "downVote".

export function voteOnPost(post,voteOption) {
  return (dispatch) => {
    fetch(`${api}/posts/${post.id}`, { headers, method: 'POST', body: JSON.stringify({"option": voteOption}) })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then((response) => response.json())
      .then(() => {return dispatch(postsFetchData())})
      .catch((response) => console.log("Error voting on post", response.statusText))
  }
}

// POST /comments/:id
// Used for voting on a comment.
// option - [String]: Either "upVote" or "downVote".

export function voteOnComment(comment,voteOption) {
  return (dispatch) => {
    fetch(`${api}/comments/${comment.id}`, { headers, method: 'POST', body: JSON.stringify({"option": voteOption}) })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then((response) => response.json())
      .then(() => {return dispatch(commentsFetchData(comment.parentId))})
      .catch((response) => console.log("Error voting on comment", response.statusText))
  }
}


// DELETE /posts/:id
// Sets the deleted flag for a post to 'true'.
// Sets the parentDeleted flag for all child comments to 'true'.

export function deletePost(post) {
  return (dispatch) => {
    fetch(`${api}/posts/${post.id}`, { headers, method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(() => {return dispatch(postsFetchData())})
      .catch((response) => console.log("Error deleting post", response.statusText))
  }
}

// DELETE /comments/:id
// Sets a comment's deleted flag to true.

export function deleteComment(comment) {
  return (dispatch) => {
    fetch(`${api}/comments/${comment.id}`, { headers, method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(() => console.log(">>>>>>>>>> comment.parentId:", comment.parentId))
      // TODO Fix bug: This refresh isn't working
      .then(() => {return dispatch(commentsFetchData(comment.parentId))})
      .catch((response) => console.log("Error deleting comment comment", response.statusText))
  }
}


// POST /posts
//  Add a new post.
// d - UUID should be fine, but any unique id will work
// timestamp - [Timestamp] Can in whatever format you like, you can use Date.now() if you like.
// title - [String]
// body - [String]
// author - [String]
// category - Any of the categories listed in categories.js. Feel free to extend this list as you desire.


export function readyForRedirectHome(bool) {
  return {
    type: 'READY_FOR_REDIRECT_HOME',
    redirectHome: bool
  }
}

export function addPost(post) {
  return (dispatch) => {
    fetch(`${api}/posts`, { headers, method: 'POST', body: JSON.stringify(post) })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(() => dispatch(readyForRedirectHome(true)))
      .catch((response) => console.log("Error adding post", response.statusText))
  }
}


// POST /comments
// Add a comment to a post.
// Add a comment to a post. id - Any unique ID. As with posts, UUID is probably the best here.
// timestamp - [Timestamp] Get this however you want.
// body - [String]
// author - [String]
// parentId - Should match a post id in the database.

export function addComment(comment) {
  return (dispatch) => {
    fetch(`${api}/comments`, { headers, method: 'POST', body: JSON.stringify(comment) })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(() => dispatch(readyForRedirectHome(true)))
      .catch((response) => console.log("Error adding comment", response.statusText))
  }
}


// PUT /posts/:id
// Edit the details of an existing post.
// title - [String]
// body - [String]

export function updatePost(post) {
  return (dispatch) => {
    fetch(`${api}/posts/${post.id}`, { headers, method: 'PUT', body: JSON.stringify({"body": post.body, "title": post.title}) })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(() => dispatch(readyForRedirectHome(true)))
      .catch((response) => console.log("Error updating post", response.statusText))
  }
}
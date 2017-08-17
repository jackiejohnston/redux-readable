export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const DELETE_POST = 'DELETE_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

// POST /posts
// USAGE:
// Add a new post

// PARAMS:
// id - UUID should be fine, but any unique id will work
// timestamp - timestamp in whatever format you like, you can use Date.now() if you like
// title - String
// body - String
// owner - String
// category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

export function addPost ({ id, timestamp, title, body, owner, category }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    owner,
    category,
  }
}


// POST /posts/:id
// USAGE:
// Used for voting on a post

// PARAMS:
// option - String: Either "upVote" or "downVote"

export function voteOnPost ({ id, option }) {
  return {
    type: VOTE_ON_POST,
    id,
    option,
  }
}

// PUT /posts/:id
// USAGE:
// Edit the details of an existing post

// PARAMS:
// title - String
// body - String

// ??? add timestamp ???

export function updatePost ({ id, title, body }) {
  return {
    type: UPDATE_POST,
    id,
    title,
    body,
  }
}


// DELETE /posts/:id
// USAGE:
// Sets the deleted flag for a post to 'true'.
// Sets the parentDeleted flag for all child comments to 'true'.

export function deletePost ({ id }) {
  return {
    type: DELETE_POST,
    id,
  }
}


// POST /comments
// USAGE:
// Add a comment to a post

// PARAMS:
// id: Any unique ID. As with posts, UUID is probably the best here.
// timestamp: timestamp. Get this however you want.
// body: String
// owner: String
// parentId: Should match a post id in the database.

export function addComment ({ id, timestamp, body, owner, parentId }) {
  return {
    type: ADD_COMMENT,
    id,
    timestamp,
    body,
    owner,
    parentId,
  }
}


// POST /comments/:id
// USAGE:
// Used for voting on a comment.

export function voteOnComment ({ id, option }) {
  return {
    type: VOTE_ON_COMMENT,
    id,
    option,
  }
}


// PUT /comments/:id
// USAGE:
// Edit the details of an existing comment

// PARAMS:
// timestamp: timestamp. Get this however you want.
// body: String

export function updateComment ({ id, body, timestamp }) {
  return {
    type: UPDATE_POST,
    id,
    body,
    timestamp,
  }
}


// DELETE /comments/:id
// USAGE:
// Sets a comment's deleted flag to 'true'

export function deleteComment ({ id }) {
  return {
    type: DELETE_COMMENT,
    id,
  }
}
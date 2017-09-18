export function getVisiblePosts(posts, sortBy) {
    return posts
      .filter(post => {
        return (
          post.deleted === false
        )
      })
      .sort((a, b) => {
        switch(sortBy) {
          case 'scoreAsc':
            return ((a.voteScore < b.voteScore) ? -1 : ((a.voteScore > b.voteScore) ? 1 : 0))
          case 'scoreDesc':
            return ((a.voteScore > b.voteScore) ? -1 : ((a.voteScore < b.voteScore) ? 1 : 0))
          case 'timeAsc':
            return ((a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0))
          case 'timeDesc':
            return ((a.timestamp > b.timestamp) ? -1 : ((a.timestamp < b.timestamp) ? 1 : 0))
          default:
            return ((a.timestamp > b.timestamp) ? -1 : ((a.timestamp < b.timestamp) ? 1 : 0))
        }
      })
  }
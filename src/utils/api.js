const api = 'http://localhost:5001'
const key = 'whatever-you-want'
const headers = {
  'Accept': 'application/json',
  'Authorization': key
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
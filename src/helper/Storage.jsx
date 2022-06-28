const KEY = 'ANIME'
const KEY_COLLECTION = 'DETAIL_COLLECTION'

export function getCollection () {
  return JSON.parse(localStorage.getItem(KEY)) || []
}

export function saveCollection (data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}
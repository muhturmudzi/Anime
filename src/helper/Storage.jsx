const KEY = 'ANIME'
const KEY_COLLECTION = 'DETAIL_COLLECTION'

export function getCollection () {
  return JSON.parse(localStorage.getItem(KEY)) || []
}

export function saveCollection (data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function getDetailCollection () {
  return JSON.parse(localStorage.getItem(KEY_COLLECTION)) || {}
}

export function saveDetailCollection (data) {
  localStorage.setItem(KEY_COLLECTION, JSON.stringify(data))
}
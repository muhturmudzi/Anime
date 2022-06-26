import { gql } from '@apollo/client'

export const GET_LIST_ANIME = gql`
  query getListAnime ($page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media {
        id
        title {
          english
        }
        coverImage {
          large
          medium
          color
        }
        bannerImage
        status
        episodes
      }
    }
  }
  `
  // genres
  // episodes
  // chapters
  // isAdult
  // type
  // status
  // popularity

export const GET_ANIME_DETAIL = gql`
  query getAnimeDetail ($id: Int) {
    Media (id: $id) {
      id
      title {
        english
      }
      coverImage {
        large
        medium
        color
      }
      bannerImage
      genres
      episodes
      chapters
      isAdult
      type
      status
      popularity
    }
  }
`
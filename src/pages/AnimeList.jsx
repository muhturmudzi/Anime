import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { GET_LIST_ANIME } from './../graphql/anime-query'

export default function AnimeList () {
  const [page, setPage] = useState(1)
  const [Animes, setAnimes] = useState([])
  const { loading, error, data } = useQuery(GET_LIST_ANIME, { variables: { page: page, perPage: 20 } })

  useEffect(() => {
    setAnimes(data)
    console.log(data, page)
  }, [data])

  const changePage = () => {
    setPage((page) => page + 1)
  }

  return (
    <main>
      <section className="section">
        <div className="container" onClick={changePage}>
          hallo ini anime list
        </div>
      </section>
    </main>
  )
}
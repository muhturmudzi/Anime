import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { GET_LIST_ANIME } from './../graphql/anime-query'

import Card from '../components/Card'

export default function AnimeList () {
  const [page, setPage] = useState(1)
  const [Animes, setAnimes] = useState([])
  const { loading, error, data } = useQuery(GET_LIST_ANIME, { variables: { page: page, perPage: 20 } })

  useEffect(() => {
    setAnimes(data)
    console.log( data, page)
  }, [data])

  const changePage = () => {
    setPage((page) => page + 1)
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="wrap">
            {Animes && Animes.Page && Animes.Page.media.map((item, index) => {
              return <Card key={index} number={((page-1)*20)+index+1} id={item.id} title={item.title.english}
                image={item.coverImage.large} status={item.status} episodes={item.episodes} />
            })}
          </div>

          <a href="#" onClick={changePage}>tambah page</a>
        </div>
      </section>
    </main>
  )
}
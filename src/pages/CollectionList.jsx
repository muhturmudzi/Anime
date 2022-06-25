import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { GET_ANIME_DETAIL } from './../graphql/anime-query'

export default function CollectionList () {
  const { loading, error, data } = useQuery(GET_ANIME_DETAIL, { variables: { id: 1 } })
  const [anime, setAnime] = useState(null)

  useEffect(() => {
    setAnime(data)
    console.log(data)
  }, [data])

  return (
    <main>
      <section className="section">
        <div className="container">
          my collection list
        </div>
      </section>
    </main>
  )
}
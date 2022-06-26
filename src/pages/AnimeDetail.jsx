import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { GET_ANIME_DETAIL } from '../graphql/AnimeQuery'

import Modal from '../components/Modal'

export default function AnimeDetail () {
  let {id} = useParams()
  const [Anime, setAnime] = useState(null)
  const [modal, setModal] = useState(false)
  const { loading, error, data } = useQuery(GET_ANIME_DETAIL, { variables: { id: id } })

  // const setData = async () => {
  //   await setAnime(data && data.Media)
  // }

  useEffect(() => {
    setAnime(data && data.Media)
    // console.log(Anime)
  })

  const showHideModal = (val) => {
    setModal(val)
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          parameter masuk adalah {id} {Anime && Anime.bannerImage}
          <button onClick={() => showHideModal(true)}>add to collection</button>
        </div>
      </section>

      <Modal modal={modal} animeChoosed={Anime} close={() => showHideModal(false)} />
    </main>
  )
}
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { GET_ANIME_DETAIL } from '../graphql/AnimeQuery'

import { getCollection } from '../helper/Storage'

import Modal from '../components/Modal'

export default function AnimeDetail () {
  let {id} = useParams()
  const [Anime, setAnime] = useState(null)
  const [modal, setModal] = useState(false)
  const { loading, error, data } = useQuery(GET_ANIME_DETAIL, { variables: { id: id } })

  let animeAdded = getCollection().filter(item => item.animeList.find(anime => anime.id == id))
    
  useEffect(() => {
    setAnime(data && data.Media)
  })

  const showHideModal = (val) => {
    setModal(val)
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <ul className="list list--inline p-0 list--breadcumb mb-2">
            <li>Anime</li>
            <li>{Anime && Anime.title && Anime.title.english}</li>
          </ul>
          <div className="mb-2"><img src={Anime && Anime.bannerImage} alt="banner" /></div>
          <div className="container container--mini anime-detail">
            <div className="text-center mt-2 mb-2">
              <h2>{Anime && Anime.title && Anime.title.english}</h2>
              <button onClick={() => showHideModal(true)} className="btn btn--primary mt-1">Add to Collection</button>
            </div>
            <div>
              {animeAdded.length > 0 && 
                <>
                  <p className="label">This anime is available in collection:</p>
                  <div className="wrap-desc">
                    {animeAdded.length > 0 && animeAdded.map(item => {
                      return <span className="desc" key={item.title}>{item.title}</span>
                    })}
                  </div>
                </>
              }
              {animeAdded.length < 1 && <p className="label">{Anime && Anime.title && Anime.title.english} not in any collection yet</p>}
            </div>
            <div>
              <p className="label">Type</p>
              <span className="desc">{Anime && Anime.type}</span>
            </div>
            <div>
              <p className="label">Popularity</p>
              <span className="desc">{Anime && Anime.popularity}</span>
            </div>
            <div>
              <p className="label">Status</p>
              <span className="desc">{Anime && Anime.status} {Anime && Anime.episodes && <span>{Anime.episodes} episodes</span>}</span>
            </div>
            <div>
              <p className="label">Genre</p>
              <div className="wrap-desc">
                {Anime && Anime.genres && Anime.genres.map(item => {
                  return <span className="desc" key={item}>{item}</span>
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal modal={modal} animeChoosed={Anime} close={() => showHideModal(false)} />
    </main>
  )
}
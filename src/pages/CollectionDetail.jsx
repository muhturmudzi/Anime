import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Card from '../components/Card'
import Modal from '../components/Modal'

import { getCollection, saveCollection } from '../helper/Storage'

export default function MyCollectionDetail () {
  let {title} = useParams()
  const data = getCollection().filter(item => item.title === title)[0].animeList
  const [myCollection, setMyCollection] = useState(data)
  const [animeChoosed, setAnimeChoosed] = useState(null)
  const [modal, setModal] = useState(false)

  let navigate = useNavigate()
  const detailAnime = (item) => {
    navigate(`/anime-detail/${item.id}`)
  }

  const animePage = () => {
    navigate('/anime-list')
  }

  const showHideModal = (val, data) => {
    setAnimeChoosed(data)
    setModal(val)
  }

  const removeCollection = (item, index) => {
    setMyCollection(myCollection.filter((_, indexCollection) => indexCollection !== index))
    
    let newArrAnime = myCollection.filter((_, indexCollection) => indexCollection !== index)
    let newArrCol = getCollection()
    newArrCol.forEach(col => {
      if (col.title === title) {
        col.animeList = newArrAnime
      }
    })
    saveCollection(newArrCol)
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <ul className="list list--inline p-0 list--breadcumb mb-2">
            <li>My Collection</li>
            <li>{title}</li>
          </ul>
          <h3 className="text-center mb-2">{title}'s Collection</h3>
          <div className="wrap">
            {myCollection.length > 0 && myCollection.map((item, index) => {
              return <Card key={index} number={index+1} id={item.id} title={item.title.english}
                image={item.coverImage.large} status={item.status} type="both" removeCollection={() => removeCollection(item, index)}
                checkDetail={() => detailAnime(item)} addCollection={() => showHideModal(true, item)}/>
            })}

            {myCollection.length < 1 && 
              <div className="flex flex-column">
                <span>Anime not added to this collection yet</span>
                <button className="btn btn--primary-outline mt-1 align-self-center" onClick={animePage}>Add Anime here</button>
              </div>
            }
          </div>
        </div>
      </section>

      <Modal modal={modal} animeChoosed={animeChoosed} close={() => showHideModal(false)} />
    </main>
  )
}
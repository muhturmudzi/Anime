import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Card from '../components/Card'
import Modal from '../components/Modal'

import { getDetailCollection } from '../helper/Storage'

export default function MyCollectionDetail () {
  let {title} = useParams()
  const [myCollection, setMyCollection] = useState(getDetailCollection)
  const [animeChoosed, setAnimeChoosed] = useState(null)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    // let data = getCollection.find(item => item.title === title)
    // let data = getCollection
    // let findData = data.find(item => item.title === title)
    // let data = getCollection
    // let findData = 
    // setMyCollection(getCollection)
    // console.log(myCollection)
    // findCollection()
    // getCollection.forEach(item => {
    //   console.log(item)
    // })
    // console.log(getCollection, 'collection')
    console.log(myCollection)
  }, [getDetailCollection])

  // const findCollection = async () => {
    // let data = await getCollection
    // console.log(data)
    // let newData = data.find((item) => item.title === title)
    // setMyCollection(newData)
  // }

  let navigate = useNavigate()
  const detailAnime = (item) => {
    navigate(`/anime-detail/${item.id}`)
    console.log(item)
  }

  const showHideModal = (val, data) => {
    console.log(data)
    setAnimeChoosed(data)
    setModal(val)
  }

  const removeCollection = (item) => {
    console.log(item)
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <h3>My Collection from {title}</h3>
          <div className="wrap">
            {myCollection && myCollection.animeList && myCollection.animeList.map((item, index) => {
              return <Card key={index} number={index+1} id={item.id} title={item.title.english}
                image={item.coverImage.large} status={item.status} type="both" removeCollection={() => removeCollection(item)}
                checkDetail={() => detailAnime(item)} addCollection={() => showHideModal(true, item)}/>
            })}
            {/* return (<span>{item.title.english}</span>) */}
            {/* {myCollection.map((element, index) => {
              return (<span key={index}>{element.title}</span>)
            })} */}
          </div>
        </div>
      </section>

      <Modal modal={modal} animeChoosed={animeChoosed} close={() => showHideModal(false)} />
    </main>
  )
}
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Card from '../components/Card'
import Modal from '../components/Modal'

import { getCollection, saveCollection } from '../helper/Storage'

export default function MyCollectionDetail () {
  let {title} = useParams()
  const data = getCollection().filter(item => item.title === title)[0]
  const [myCollection, setMyCollection] = useState(data)
  const [animeChoosed, setAnimeChoosed] = useState(null)
  const [modal, setModal] = useState(false)
  
  console.log(myCollection, 'collection')

  useEffect(() => {
    // console.log(getCollection().filter(item => item.title === title), 'collection')
    // console.log(data, 'temp')
    // setMyCollection({title: 'yoi', judul: 'iyo'})
    // console.log(myCollection, 'collection')

    // if (data.length > 0) {
    //   findCollection()
    //   setMyCollection(data)
    //   console.log(myCollection)
    // }
  }, [])

  const findCollection = async () => {
    // let data = await getCollection
    // console.log(data)
    // let newData = data.find((item) => item.title === title)
    // setMyCollection(newData)

    await setMyCollection(() => {return {title: 'yoi', judul: 'iyo'}})
    // console.log(myCollection, 'collection')
  }

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

  const removeCollection = (item, index) => {
    // console.log(item)
    console.log(myCollection.animeList)
    // setMyCollection(myCollection.animeList.filter((_, indexCollection) => indexCollection !== index))
    // saveCollection(myCollection.filter((_, indexCollection) => indexCollection !== index))
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <h3 className="text-center mb-2">{title}'s Collection</h3>
          <div className="wrap">
            {myCollection && myCollection.animeList && myCollection.animeList.map((item, index) => {
              return <Card key={index} number={index+1} id={item.id} title={item.title.english}
                image={item.coverImage.large} status={item.status} type="both" removeCollection={() => removeCollection(item, index)}
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
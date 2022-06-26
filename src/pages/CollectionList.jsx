import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useQuery } from '@apollo/client'

// import { GET_ANIME_DETAIL } from '../graphql/AnimeQuery'

import Card from '../components/Card'

import { getCollection, saveDetailCollection, saveCollection } from '../helper/Storage'

export default function CollectionList () {
  // const { loading, error, data } = useQuery(GET_ANIME_DETAIL, { variables: { id: 1 } })
  // const [anime, setAnime] = useState(null)
  const [myCollection, setMyCollection] = useState(getCollection)

  useEffect(() => {
    // setAnime(data)
    // console.log(data)
    // setMyCollection(getCollection)
    // saveCollection(myCollection)
  }, [myCollection])

  let navigate = useNavigate()
  const detailCollection = (item) => {
    saveDetailCollection(item)
    navigate(`/collection-detail/${item.title}`)
    console.log(item)
  }

  const removeCollection = (index) => {
    console.log(index)
    let data = myCollection
    data.splice(index,1)
    setMyCollection(data)
    saveCollection(data)
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="wrap">
            {myCollection.length > 0 && myCollection.map((item, index) => {
              return (
                // <div key={index} onClick={() => detailCollection(item)}>
                //   <h3>{item.title}</h3>
                //   {item.animeList.length > 0 && item.animeList.map((anime, indexAnime) => {
                //     return (<span key={indexAnime}>{anime.title.english}</span>)
                //   })}

                //   {item.animeList.length < 1 && (
                //     <span>Collection belum memiliki anime</span>
                //   )}
                // </div>
                <Card key={index} number={index+1} title={item.title}
                  image={item.animeList[0].coverImage.large} type="collection"
                  checkDetail={() => detailCollection(item)} removeCollection={() => removeCollection(index)}/>
              )
            })}

            {myCollection.length < 1 && <span>Tidak ada Collection</span>}
          </div>
        </div>
      </section>
    </main>
  )
}
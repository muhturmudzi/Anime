import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getCollection, saveCollection } from '../helper/Storage'

export default function Modal ({ modal, animeChoosed, close }) {
  const [collections, setCollection] = useState(getCollection)
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)
  // const [showInput, setShowInput] = useState(false)

  // useEffect(() => {
  //   saveCollection(collections)
  // }, [collections])

  const onChangeHandler = event => {
    setTitle(event.target.value)
  }

  const addNewCollection = () => {
    setTitle('')
    // setShowInput(false)
    const newCollection = { title: title, animeList: [animeChoosed]}

    if (collections.length < 1) {
      setCollection([newCollection])
      saveCollection([newCollection])
      close()
      return
    }

    let data = collections
    let checkTitle = data.find(item => item.title === newCollection.title)

    // console.log(checkTitle)
    if (checkTitle) {
      setError(true)
      return
    }

    setError(false)
    data.push(newCollection)
    setCollection(data)
    saveCollection(data)
    // console.log(collections)
    close()
  }

  // const showingInput = () => {
  //   setTitle('')
  //   if (!showInput) {
  //     setShowInput(true)
  //     return
  //   }

  //   addNewCollection()
  // }

  const addtoCollection = (val) => {
    // console.log(val, 'title')
    // console.log(animeChoosed)
    let data = collections

    data.forEach(item => {
      if (item.title === val.title) {
        let checkAnime = item.animeList.find(el => el.id === animeChoosed.id)
        if (!checkAnime) {
          item.animeList.push(animeChoosed)
        }
      }
    })

    // console.log(data)

    setCollection(data)
    saveCollection(data)
    // console.log(collections)

    close()
  }

  let navigate = useNavigate()
  const detailCollection = (item) => {
    // saveDetailCollection(item)
    navigate(`/collection-detail/${item.title}`)
    console.log(item)
    close()
  }

  return (
    <div className={`overlay-wrap modal ${modal? 'active' : ''}`}>
      <div className="close-overlay" onClick={close}></div>
      <div className="popup">
        {collections.length > 0 && (
          <>
            <div>
              <input className="input" placeholder="Collection's title" type="text" value={title} onChange={onChangeHandler} />
              {error && <span className="error-msg">collection's title already exist</span>}
            </div>
            <div className="text-center">
              <button className="btn btn--primary mt-1" onClick={addNewCollection}>Add as New Collection</button>
            </div>
            <div className="separation">
              <div className="separation__text">or added to exist's collection</div>
            </div>
          </>
        )}
        {collections.length > 0 &&
          <div className="card-list-collection">
            <ul className="list list--collection p-0">
              {collections.map((item, index) => {
                return (
                  <li key={index+item.title}>
                    <span onClick={() => detailCollection(item)}>{item.title}</span>
                    <button className="add" onClick={() => addtoCollection(item)}>+</button>
                    {/* <button>See Detail Collection</button> */}
      
                    {/* <div>
                      {item.animeList.length > 0 && item.animeList.map((anime, indexAnime) => {
                          return (
                            <span key={`list-anime-${indexAnime}`}>{anime && anime.title && anime.title.english}</span>
                          )
                        }
                      )}
      
                      {item.animeList.length < 1 && (
                        <span>belum memiliki anime</span>
                      )}
                    </div> */}
                  </li>
                )
              })}
            </ul>
          </div>
        }

        {
          collections.length < 1 && (
            <div className="text-center">
              <input className="input" placeholder="Collection's title" type="text" value={title} onChange={onChangeHandler} />
              <button className="btn btn--primary mt-1" onClick={addNewCollection}>Add New Collection</button>
            </div>
          )
        }
      </div>
    </div>
  )
}
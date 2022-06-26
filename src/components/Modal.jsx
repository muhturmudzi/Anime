import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getCollection, saveCollection, saveDetailCollection } from '../helper/Storage'

export default function Modal ({ modal, animeChoosed, close }) {
  const [collections, setCollection] = useState(getCollection)
  const [title, setTitle] = useState('')
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    saveCollection(collections)
  }, [collections])

  const onChangeHandler = event => {
    setTitle(event.target.value)
  }

  const addNewCollection = () => {
    setShowInput(false)
    const newCollection = { title: title, animeList: [animeChoosed]}

    if (collections.length < 1) {
      setCollection([newCollection])
      return
    }

    let data = collections
    let checkTitle = data.find(item => item.title === newCollection.title)

    // console.log(checkTitle)
    if (!checkTitle) {
      data.push(newCollection)
      setCollection(data)
      saveCollection(data)
      // console.log(collections)
    }
  }

  const showingInput = () => {
    setTitle('')
    if (!showInput) {
      setShowInput(true)
      return
    }

    addNewCollection()
  }

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
    saveDetailCollection(item)
    navigate(`/collection-detail/${item.title}`)
    console.log(item)
  }

  return (
    <div className={`overlay-wrap modal ${modal? 'active' : ''}`}>
      <div className="close-overlay" onClick={close}></div>
      <div className="popup">
        {collections.length > 0 && (
          <div>
            {showInput && <input type="text" value={title} onChange={onChangeHandler} />}
            <button onClick={showingInput}>Add as New Collection</button>
          </div>
        )}
        {collections.length > 0 && collections.map((item, index) => {
          return (
            <div className="mt-1" key={index+item.title}>
              <span>{item.title}</span>
              <button onClick={() => addtoCollection(item)}>Add</button>
              <button onClick={() => detailCollection(item)}>See Detail Collection</button>

              <div>
                {item.animeList.length > 0 && item.animeList.map((anime, indexAnime) => {
                    return (
                      <span key={`list-anime-${indexAnime}`}>{anime && anime.title && anime.title.english}</span>
                    )
                  }
                )}

                {item.animeList.length < 1 && (
                  <span>belum memiliki anime</span>
                )}
              </div>
            </div>
          )
        })}

        {
          collections.length < 1 && (
            <div>
              <input type="text" value={title} onChange={onChangeHandler} />
              <button onClick={addNewCollection}>Add New Collection</button>
            </div>
          )
        }
      </div>
    </div>
  )
}
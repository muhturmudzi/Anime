import React from 'react'
// import { useNavigate } from 'react-router-dom'

import nullBox from '../assets/images/package.png'

// let navigate = useNavigate()
// const goDetail = (id) => {
//   navigate(`/anime-detail/${id}`)
//   console.log(id)
// }

export default function Card ({ number, id, type, title, image, status, episodes, checkDetail, addCollection, removeCollection }) {
  return (
    <div className="card">
      <div onClick={checkDetail}>
        <div className="card__image">
          {image && <img src={image} alt={image} />}
          {!image && <img src={nullBox} alt='box' />}
          <span>{number}</span>
        </div>
        <div className="card__main">
          {status && 
            <span className={`card__main__status ${status === 'FINISHED'? 'done' : ''}`}>
              {status} {episodes && `${episodes} eps`}
            </span>
          }
          <h3 className={`card__main__title ${!status? 'm-0':''}`}>{title}</h3>
          {/* {episodes && <div className="card__main__status episodes">Total {episodes} Episodes</div>} */}
        </div>
      </div>
      <div className="card__btn">
        {/* <button onClick={checkDetail}>Check Detail</button> */}
        {type === 'anime' && <button className="add" onClick={addCollection}>+</button>}
        {type === 'collection' && <button className="remove" onClick={removeCollection}></button>}
        {type === 'both' && (
          <>
            <button className="add" onClick={addCollection}>+</button>
            <button className="remove" onClick={removeCollection}></button>
          </>
        )}
      </div>
    </div>
  )
}
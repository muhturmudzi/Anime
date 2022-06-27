import React from 'react'
// import { useNavigate } from 'react-router-dom'

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
          <img src={image} alt={image} />
          <span>{number}</span>
        </div>
        <div className="card__main">
          <h3 className="card__main__title">{title}</h3>
          {status && 
            <span className={`card__main__status ${status === 'FINISHED'? 'done' : ''}`}>
              {status}
            </span>
          }
          {/* {episodes && <div className="card__main__status episodes">Total {episodes} Episodes</div>} */}
        </div>
      </div>
      <div className="card__btn">
        {/* <button onClick={checkDetail}>Check Detail</button> */}
        {type === 'anime' && <button onClick={addCollection}>Add to Collection</button>}
        {type === 'collection' && <button onClick={removeCollection}>Remove</button>}
        {type === 'both' && (
          <div>
            <button onClick={addCollection}>Add to Collection</button>
            <button onClick={removeCollection}>Remove</button>
          </div>
        )}
      </div>
    </div>
  )
}
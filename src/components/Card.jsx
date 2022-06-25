import React from 'react'

export default function Card ({ number, id, title, image, status, episodes }) {
  return (
    <div className="card">
      <img src={image} alt={image} />
      {number} {id} {title} {status} {episodes}
    </div>
  )
}
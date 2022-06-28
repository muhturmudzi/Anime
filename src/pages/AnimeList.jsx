import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import ReactPaginate from 'react-paginate'

import { GET_LIST_ANIME } from '../graphql/AnimeQuery'

import Card from '../components/Card'
import Modal from '../components/Modal'

const isSmallDevice = window.screen.width < 450

export default function AnimeList () {
  const [modal, setModal] = useState(false)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(10)
  const [Animes, setAnimes] = useState([])
  const [animeChoosed, setAnimeChoosed] = useState(null)
  const { loading, error, data } = useQuery(GET_LIST_ANIME, { variables: { page: page, perPage: 10 } })

  useEffect(() => {
    setAnimes(data)
  }, [data])

  const handlePageClick = (event) => {
    setPage(event.selected+1)
  }

  let navigate = useNavigate()
  const detailAnime = (item) => {
    navigate(`/anime-detail/${item.id}`)
  }

  const showHideModal = (val, data) => {
    setAnimeChoosed(data)
    setModal(val)
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="wrap">
            {Animes && Animes.Page && Animes.Page.media.map((item, index) => {
              return <Card key={index} number={((page-1)*10)+index+1} id={item.id} title={item.title.english}
                image={item.coverImage.large} status={item.status} episodes={item.episodes} type="anime"
                checkDetail={() => detailAnime(item)} addCollection={() => showHideModal(true, item)}/>
            })}
          </div>

          <ReactPaginate
            className="paginate"
            breakLabel="..."
            nextLabel={isSmallDevice? '>' : 'next >'}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            forcePage={0}
            pageCount={pageCount}
            previousLabel={isSmallDevice? '<' : '< previous'}
            renderOnZeroPageCount={null}
          />
        </div>
      </section>

      <Modal modal={modal} animeChoosed={animeChoosed} close={() => showHideModal(false)} />
    </main>
  )
}
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import ReactPaginate from 'react-paginate'

import { GET_LIST_ANIME } from '../graphql/AnimeQuery'

import Card from '../components/Card'
import Modal from '../components/Modal'

// import { getCollection } from '../helper/Storage'

export default function AnimeList () {
  const [modal, setModal] = useState(false)
  // const [collection, setCollection] = useState(getCollection)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(10)
  const [Animes, setAnimes] = useState([])
  const [animeChoosed, setAnimeChoosed] = useState(null)
  const { loading, error, data } = useQuery(GET_LIST_ANIME, { variables: { page: page, perPage: 10 } })

  useEffect(() => {
    setAnimes(data)
    // console.log(data, page)
    // const total = data && data.Page && data.Page.pageInfo && data.Page.pageInfo.lastPage
    // setPageCount(total)
  }, [data])

  // const changePage = () => {
  //   setPage((page) => page + 1)
  // }

  const handlePageClick = (event) => {
    // console.log(event, 'value click')
    setPage(event.selected+1)
    // console.log(page, 'currentpage')
  }

  let navigate = useNavigate()
  const detailAnime = (item) => {
    navigate(`/anime-detail/${item.id}`)
    // console.log(item)
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

          {/* <a href="#" onClick={changePage}>tambah page</a> */}
          <ReactPaginate
            className="paginate"
            // breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            forcePage={0}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </section>

      <Modal modal={modal} animeChoosed={animeChoosed} close={() => showHideModal(false)} />
      {/* collection={collection} */}
    </main>
  )
}
import * as React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import './assets/css/app.css'

import { client } from './graphql/index'

import Topbar from './components/Topbar'

const AnimeList = React.lazy(() => import('./pages/AnimeList'))
const CollectionList = React.lazy(() => import('./pages/CollectionList'))

const Loading = () => {
  return <span>Loading</span>
}

function App() {
  return (
    <React.Suspense fallback={Loading()}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutsWithNavbar />}>
              <Route path='/anime-list' element={<AnimeList />} />
              <Route path='/collection-list' element={<CollectionList />} />
              <Route path='/' element={<Navigate to='/anime-list' replace />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </React.Suspense>
  )
}

function LayoutsWithNavbar() {
  return (
    <>
      {/* Your navbar component */}
      <Topbar />

      {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
      <Outlet /> 
      
      {/* You can add a footer to get fancy in here :) */}
    </>
  );
}

export default App

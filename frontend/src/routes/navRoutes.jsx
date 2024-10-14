import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from '../components/main/components/home/home'
import AllNotes from '../components/main/components/All_Notes/allNotes'
import Create from '../components/main/components/create/create'
import NotFound from '../components/main/components/notFound'

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notes" element={<AllNotes />} />
      <Route path="/create" element={<Create />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default NavRoutes
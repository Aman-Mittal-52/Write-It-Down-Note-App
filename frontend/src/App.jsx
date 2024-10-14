import { useState } from 'react'
import './App.css'
import Navbar from './components/header/navbar'
import Main from './components/main/main'
import { Flex } from '@chakra-ui/react'

function App() {

  return (
    <Flex h='95%' overflow='hidden' flexDir='column' align='stretch'>
      <Navbar />
      <Main />
    </Flex>
  )
}

export default App

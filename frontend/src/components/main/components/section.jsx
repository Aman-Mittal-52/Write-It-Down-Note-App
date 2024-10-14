import React from 'react'
import { Flex } from '@chakra-ui/react'

import SectionItem from './sectionItem'

import { FaHome } from 'react-icons/fa'
import { FaSquarePen } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";

function Section() {
    return (
        <Flex bg='black' pos='sticky' top='200px' color='white' flexDir='column' p='14' gap='50px'borderRight='2px solid #888888'  >
            <SectionItem Icon={FaHome} text='Home' to='/' />
            <SectionItem Icon={MdMenuBook} text='All Notes' to='/notes' />
            <SectionItem Icon={FaSquarePen} text='Create Note' to='/create' />
        </Flex >
    )
}

export default Section
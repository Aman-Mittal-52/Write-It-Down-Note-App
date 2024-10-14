import React from 'react'

import { Flex } from '@chakra-ui/react'

import Section from './components/section';
import NavRoutes from '../../routes/navRoutes';

function Main() {

    return (
        <Flex flexGrow='1' h='100%' >
            <Section />
            <NavRoutes />            
        </Flex>
    )
}

export default Main
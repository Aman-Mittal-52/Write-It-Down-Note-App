import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Flex, Text, Link as ChakraLink } from '@chakra-ui/react'

function SectionItem({ text, to, Icon }) {
    return (
        <ChakraLink as={RouteLink} to={to}>
            <Flex gap='10px'>
                <Icon color='white' size='2vw' />
                <Text fontSize='xl'>{text}</Text>
            </Flex>
        </ChakraLink>
    )
}

export default SectionItem
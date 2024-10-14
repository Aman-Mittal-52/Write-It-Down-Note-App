import { Button, Flex, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {

    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate('/')
    }

    return (
        <Flex w='80%' justify='center' align='center' flexDir='column' m='auto' color='white'>
            <Text fontSize={'4xl'} fontWeight='extrabold'>
                Page not found! 
                <br />Please go back to the home page.
            </Text>
            <Button w='50%' m={'16'} onClick={handleClick}>Home</Button>
            <Text>Thanks for using our application</Text>
            <Link href='https://github.com/aman-mittal-52'>
                <Button m='5' p={8} fontSize='sm' color='blue.600'>
                    Source code on Github
                    <br />
                    @Aman-Mittal-52
                </Button>
            </Link>
        </Flex>
    )
}

export default NotFound
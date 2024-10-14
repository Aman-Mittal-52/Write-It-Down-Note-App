import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()

    const handleClick = () => {
        setTimeout(() => {
            navigate('/create')
        }, 1500);
    }
    return (
        <Flex justify='center' align='center' w='80%' p={10} color='white' flexDir='column'>
            <Text fontSize='6xl' fontWeight='semibold'>Welcome to Note App</Text>
            <Text>Capture your thoughts, organize tasks, and stay productive with <br /> <i style={{
                fontWeight: 'bold', background: 'linear-gradient(to right, #8EC5FC, #0093E9)', WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>Write It Down</i> - your perfect companion for daily planning and ideas.</Text>
            <Button
                w='40%'
                m='8'
                onClick={handleClick}
                position="relative"
                fontSize="16px"
                textAlign="center"
                textDecoration="none"
                transition="all 0.4s"
                _hover={{
                    transitionDuration: "0.1s",
                    bg: "#999",
                }}
                _after={{
                    content: '""',
                    display: "block",
                    position: "absolute",
                    borderRadius: "full",
                    left: "0",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    transition: "all 0.5s",
                    boxShadow: "0 0 10px 40px white",
                }}
                _active={{
                    top: "1px",
                    _after: {
                        boxShadow: "0 0 0 0 white",
                        opacity: 1,
                        transition: "0s",
                    },
                }}
            >Write your Idea...</Button>
        </Flex>
    )
}

export default Home
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, Textarea, useToast, Link as ChakraLink } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link as RouteLink, useNavigate } from 'react-router-dom'

import Cookie from 'js-cookie';

function Create() {

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const toast = useToast();

    const handleSubmit = async () => {
        if (!content || !title) {
            toast({
                title: "Error",
                description: "Please fill out all fields",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        let token;
        if (Cookie.get('token')) {
            token = Cookie.get('token');
        } else {
            toast({
                title: 'Error',
                description: 'You are not logged in. Please login to create notes.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await fetch(`https://write-it-down-note-app.onrender.com/notes/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });

            toast({
                title: 'Note created successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            navigate('/notes')
        } catch (error) {
            toast({
                title: "Error",
                description: JSON.stringify(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }

    }
    useEffect(() => {
        if (!Cookie.get('token')) {
            toast({
                title: 'Please login',
                description: 'You need to login to create notes.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [])

    return (
        <Box w='80%' color='white' p={10}>
            <Box w='70%' m='auto' mb='10' color='black' bg='white' borderRadius='20px' p='6'>
                <Heading textAlign='center' mb='4'>
                    Write It Down
                </Heading>
                <FormControl>
                    <FormLabel fontWeight='bold'>Title</FormLabel>
                    <Input placeholder='Enter note title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea placeholder='Enter your note description' maxH='150px' value={content} onChange={(e) => { setContent(e.target.value) }} />
                </FormControl>
                <Button w='100%' mt={6} colorScheme='blue' onClick={handleSubmit}>Create</Button>
            </Box>
            <Flex justify='space-between' align='end'>
                <Text fontSize='4xl'>
                    Save Your Idea With
                    <br />
                    <i style={{
                        fontWeight: 'bold',
                        fontSize: '60px',
                        background: 'linear-gradient(to right, #8EC5FC, #0093E9)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Write It Down
                    </i>
                </Text>
                <ChakraLink as={RouteLink} to='https://github.com/Aman-mittal-52'>
                    <Text>GitHub - @Aman-Mittal-52</Text>
                </ChakraLink>
            </Flex>
        </Box>
    )
}

export default Create
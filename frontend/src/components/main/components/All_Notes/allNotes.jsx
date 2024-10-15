import { Box, Button, Divider, Flex, Heading, SimpleGrid, Text, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import EditNote from './editNote';

function AllNotes() {

    const [isLoading, setLoading] = useState(false)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [notes, setNotes] = useState([]);
    const toast = useToast();
    const navigate = useNavigate()

    const { isOpen, onToggle } = useDisclosure()


    const fetchNotes = async () => {
        try {
            let token;
            if (Cookie.get('token')) {
                token = Cookie.get('token');
            }

            setLoading(true);

            const response = await fetch('https://write-it-down-note-app.onrender.com/notes', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                setNotes((prevNotes) => data.notes);

                if (data.notes.length === 0) {
                    toast({
                        title: 'No notes found',
                        description: 'You have no notes yet. Please create one.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            }
        } catch (error) {
            setLoading(false);
            console.log('Error fetching data:', error);
        }
    };


    const handleDelete = async (noteID) => {
        try {
            let token;
            if (Cookie.get('token')) {
                token = Cookie.get('token');
            }

            setLoading(true);

            const response = await fetch(`https://write-it-down-note-app.onrender.com/notes/delete/${noteID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            const newNotes = notes.filter((note) => note._id !== noteID);

            setNotes(newNotes);
            setLoading(false);

            toast({
                title: `Note deleted successfully, ${data.deletedNote.title}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            setLoading(false);
            console.log('Error deleting note:', error);
        }
    };

    const handleClick = (t, c) => {
        setTitle(t);
        setContent(c);
        onToggle();
    }


    useEffect(() => {
        fetchNotes();
        if (!Cookie.get('token')) {
            toast({
                title: 'Please login',
                description: 'You need to login to view your notes.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }, []);

    return (

        <SimpleGrid
            flex='8'
            overflowY='auto'
            columns={[1, 1, 2, 3]}
            w='100%'
            h='90%'
            gridGap='30px'
            p='14'
            sx={{
                '::-webkit-scrollbar': {
                    display: 'none'
                },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
            }} >
            {
                notes.length <= 0 ?
                    (
                        <Box color='#fff' border='1px solid white' borderRadius='20px' h='50%' p={6}>
                            <Heading fontSize='xl'>No notes found</Heading>
                            <Text m={6}>You have no notes yet. Please create one.</Text>
                            <Button onClick={() => navigate('/create')}>Create New Note</Button>
                        </Box>
                    )
                    :
                    notes.map((n, i) => {
                        return (
                            <Flex key={i} flexDir='column' justify='space-between' bg='white' borderWidth='1px' borderRadius='15px' px='10' py='6'>
                                <Box>
                                    <Heading title={n.title} fontSize='xl'>{n.title}</Heading>
                                    <Divider borderColor='#999999' mt={2} mb={4} />
                                    <Text title={n.content}>{n.content}</Text>
                                </Box>
                                <Flex align='center' justify='space-between' mt={3} >
                                    <Button w='70%' colorScheme='green' onClick={()=>{handleClick(n.title,n.content)}}>Edit</Button>
                                    <Button w='20%' colorScheme='red' onClick={() => { handleDelete(n._id) }}><MdDeleteForever size='2em' /></Button>
                                </Flex>
                                <EditNote isOpen={isOpen} onToggle={onToggle} title={title} content={content} setTitle={setTitle} setContent={setContent} id={n._id} fetchNotes={fetchNotes} />
                            </Flex>
                        )
                    })}
            {isLoading && (
                <Box w='full' h='full' display='flex' justifyContent='center' alignItems='center'>
                    <Text color='#fff'>Loading...</Text>
                </Box>
            )}
        </SimpleGrid>
    )
}

export default AllNotes

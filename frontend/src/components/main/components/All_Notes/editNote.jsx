import React, { useEffect } from 'react'
import { Textarea, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';

import Cookie from 'js-cookie';

function EditNote({ isOpen, onToggle, title, content, setTitle, setContent, id, currentTitle, currentContent, fetchNotes }) {

    const toast = useToast();
    
    const handleEdit = async () => {

        let token;
        if (Cookie.get('token')) {
            token = Cookie.get('token');
        }

        try {
            const response = await fetch(`https://write-it-down-note-app.onrender.com/notes/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });

            const data = await response.json();
            fetchNotes()
            toast({
                title: 'Note updated successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            onToggle()
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <Modal isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Uppate Note</ModalHeader>
                <ModalBody>

                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input type='text' placeholder='Enter title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea type='text' placeholder='Enter description' value={content} onChange={(e) => { setContent(e.target.value); }} maxH='300px' />
                    </FormControl>
                </ModalBody>
                <ModalFooter display='flex' justifyContent='end' gap='20px'>
                    <Button onClick={onToggle} colorScheme='red'>Cancel</Button>
                    <Button onClick={handleEdit} colorScheme='green'>Confirm</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditNote
import React, { useState } from 'react'
import { Button, Center, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import img from '../../assets/img.jpg'
import img2 from '../../assets/img2.jpg'

function Auth({ onToggle, isOpen, user, setUser, handleUser ,handleAuth, setLoading,isLoading}) {

    const [loginPage, setLoginPage] = useState(false);

    return (
        <Modal isOpen={isOpen} onOverlayClick={onToggle}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Image src={loginPage ? img : img2} alt='image' borderRadius='10px' aspectRatio='30/13' objectFit='cover' />
                </ModalHeader>
                <ModalBody>
                    <Center fontWeight='bold' fontSize='4xl' letterSpacing='6px' pos='relative'> {loginPage ? 'REGISTER' : 'LOGIN'}</Center>
                    <FormControl>
                        {
                            loginPage ?
                                <>
                                    <FormLabel>Username</FormLabel>
                                    <Input type='text' placeholder='Username'  value={user.username} name='username' my={2} onChange={(e) => {handleUser(e)}} />
                                </> : null

                        }
                        <FormLabel>Email</FormLabel>
                        <Input type='email' placeholder='Email' my={2}  value={user.email} name='email' onChange={(e)=>{handleUser(e)}}/>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' placeholder='Password' my={2} value={user.password} name='password'  onChange={(e)=>{handleUser(e)}}/>
                    </FormControl>
                    <Text textDecor='underline' fontSize='md' opacity={.8} cursor='pointer' fontWeight='semibold' color='blue.800' letterSpacing='1px' onClick={() => setLoginPage(!loginPage)}>
                        {!loginPage ? 'Create Account' : 'Already have an account?'}
                    </Text>
                    <Button onClick={()=>{handleAuth(loginPage)}} width='100%' my={3} colorScheme='green' isLoading={isLoading}> {loginPage ? 'Register' : 'Login'}</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Auth
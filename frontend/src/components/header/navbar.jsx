import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { FaPenAlt } from "react-icons/fa";
import Auth from './auth'
import Cookies from 'js-cookie';
import { BsPersonCircle } from "react-icons/bs";
import CustomButton from './customButton';


function Navbar() {

    const [isLoading, setLoading] = useState(false)
    const [logout, setLogout] = useState(false)

    const { onToggle, isOpen } = useDisclosure()
    const toast = useToast()
    const [username, setUsername] = useState('Username')

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })


    const handleUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleAuth = async (page) => {
        try {

            setLoading(true);

            if (!user.email || !user.password) {
                if (!user.username) {
                    toast({
                        title: "Please enter username",
                        status: "error",
                        duration: 5000,
                        isClosable: true
                    })
                } else {
                    toast({
                        title: "Please fill out all fields",
                        status: "error",
                        duration: 5000,
                        isClosable: true
                    })
                }
            }


            const endpoint = page ? 'register' : 'login'
            const response = await fetch(`https://write-it-down-note-app.onrender.com/user/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...user })
            });
            console.log('Success')

            const data = await response.json();

            if (response.status > 300) {
                toast({
                    title: data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true
                })
                onToggle();
            }

            if (response.status == 201 && response.status) {
                toast({
                    title: "User Registered Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true
                })
            }

            setLoading(false)

            if (data.token) {
                setUser({ username: '', email: '', password: '' })
                setLogout(true)

                toast({
                    title: "Logged In Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true
                })

                Cookies.set('token', data.token, { expires: 7, path: '/', secure: true, sameSite: 'Strict' });

            }
            localStorage.setItem('username', data.username)
            setUsername(data.username)

            onToggle()

        } catch (err) {
            toast({
                title: 'error',
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top-right'

            })
            setLoading(false)
            console.log(err);
        }

    }

    const handleLogout = () => {
        Cookies.remove('token', { path: '/' });
        toast({
            title: "Logged Out Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: 'bottom-right'
        })
        setUser({ username: '', email: '', password: '' });
        setLogout(false);
    }


    useEffect(() => {
        if (Cookies.get('token')) {
            setLogout(true)
        }
    }, [logout])

    useEffect(() => {
        if (localStorage.getItem('username')) {
            setUsername(localStorage.getItem('username'))
        }

    }, [])

    return (
        <Box bg='black' color='#fff' borderBottom='1px solid #999999' pl='6'>

            <Flex width='100%' align='center' py={5} px={4}>

                <Flex w='60%' justify='space-between' align='center' >
                    <Flex height={'100%'} align='center'>
                        <Heading
                            fontSize={['md', 'lg', 'xl', '3xl']}
                            sx={{
                                background: 'linear-gradient(to right, #8EC5FC, #0093E9)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Write It Down
                        </Heading>
                        <FaPenAlt size='20px' style={{ margin: '20px', }} />
                    </Flex>
                    <Input display={{ md: 'none', lg: 'block' }} type='text' placeholder='Search your note' w='60%' />
                </Flex>

                <Flex justify='space-around' width='40%' align='center'>
                    <Flex align='center' gap='10px'>
                        <BsPersonCircle size='20px' color='white' />
                        <Text>{username ? username : 'Username'}</Text>
                    </Flex>
                    {
                        logout ?
                            <CustomButton text='Logout' func={handleLogout} />
                            :
                            <CustomButton text='Login' border='1px solid white' func={onToggle} />
                    }
                </Flex>

            </Flex>
            <Auth onToggle={onToggle} isOpen={isOpen} user={user} setUser={setUser} handleUser={handleUser} handleAuth={handleAuth} isLoading={isLoading} setLoading={setLoading} />
        </Box >
    )
}

export default Navbar
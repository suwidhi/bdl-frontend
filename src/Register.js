import React from 'react'
import {
    Flex,
    Box,
    Spacer,
    Stack,
    Button,
    Text,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    VStack,
    Link,
    HStack
} from '@chakra-ui/react';

import apiClient from './services/api';
import { Context } from './Store'
import { useHistory } from 'react-router-dom'

function Register() {
    const history = useHistory()

    const [errors, setErrors] = React.useState({})
    const [registered, setRegistered] = React.useState(false)
    const [state, dispatch] = React.useContext(Context)

    const getCookieValue = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    )

    // try use old session ... 
    if(!state.logout){
        const token = getCookieValue('X-Sanctum-Token')

        apiClient.get('/api/persistent', {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            dispatch({type: 'SET_TOKEN', payload: token})
            dispatch({type: 'SET_USER', payload: response.data.user})
            dispatch({type: 'SET_LOGOUT', payload: false})
        })
        .catch(error => {
            console.log('failed to login...')
            dispatch({type: 'SET_LOGOUT', payload: true})
            dispatch({type: 'SET_TOKEN', payload: ''})
        })
    }

    const doRegister = function(e){
        e.preventDefault()
        const formdata = new FormData(e.target)
        const entries = Object.fromEntries(formdata.entries())

        apiClient.post('/api/register', entries)
        .then(response => {
            setRegistered(true)
            setErrors({})
        })
        .catch(error => {
            setErrors(error.response.data.errors)
        })
    }

    return (
        <Stack height="100%" width="100%" bg="blue.600" alignItems="center" justifyContent="center"
            style={
                {
                    'background': 'url(/img/background.jpg)'
                }
            }
        >
            <Box width="24rem" bg="white" padding="1rem" 
            style={{
                'boxShadow': '0 0 5px 1px #0000001f'
            }}
            backgroundColor="white">
                <Flex direction="column" padding="1rem" alignItems="center">
                    <Text fontSize="x-large" fontWeight="bold">Navi Automobile</Text>
                    <Text color="gray.500">Fill form to register</Text>
                </Flex>

                <form method="POST" onSubmit={doRegister}>
                    <VStack spacing="1rem" padding="1rem" alignItems="center">
                        
                        <FormControl id="name" size="sm" isInvalid={errors['name']}>
                            <FormLabel size="sm" color="gray.700">Your Name</FormLabel>
                            <Input borderColor="blue.400" name="name" placeholder="Input your name" size="md" bg="white"/>
                            <FormErrorMessage>{errors['name']}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="name" size="sm" isInvalid={errors['email']}>
                            <FormLabel size="sm" color="gray.700">Email</FormLabel>
                            <Input borderColor="blue.400" name="email" placeholder="Input your email" size="md" bg="white"/>
                            <FormErrorMessage>{errors['email']}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="name" size="sm" isInvalid={errors['password']}>
                            <FormLabel size="sm" color="gray.700">Password</FormLabel>
                            <Input name="password" borderColor="blue.400" placeholder="Input your password" size="md" type="password" bg="white"/>
                            <FormErrorMessage>{errors['password']}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="name" size="sm" isInvalid={errors['password_confirmation']}>
                            <FormLabel size="sm" color="gray.700">Confirm Password</FormLabel>
                            <Input name="password_confirmation" borderColor="blue.400" placeholder="Confirm Password" size="md" type="password" bg="white"/>
                            <FormErrorMessage>{errors['password_confirmation']}</FormErrorMessage>
                        </FormControl>

                        <Spacer height="2rem"/>
                        <VStack>
                            <Button type="submit" colorScheme="blue" width="12rem">Register</Button>
                            { registered && <Text textAlign="center" color="blue.400">Registered. Login Now</Text>}
                        </VStack>
                        
                    </VStack>
                </form>

                <VStack margin="1rem">
                    <Link onClick={function(){
                        window.location.href = '/login'
                    }}>Already have account. Login now</Link>
                </VStack>
            </Box>
        </Stack>
    )
}

export default Register

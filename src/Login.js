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

function Login() {
    const history = useHistory()

    const [errors, setErrors] = React.useState({})
    const [state, dispatch] = React.useContext(Context)

    const getCookieValue = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    )

    // try use old session ... 
    // because buggy of the display i want to get rid of this...
    if(false){
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
        })
        .catch(error => {
            console.log('Old session is unavailable or invalid')
        })
    }

    const doLogin = function(e){
        e.preventDefault()
        const formdata = new FormData(e.target)
        const entries = Object.fromEntries(formdata.entries())
        console.log(entries)

        apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                apiClient.post('/api/login', entries).then(response => {
                    console.log(response.data)
                    const token = response.data.token
                    // set the token and we are all free hopefully
                    dispatch({type: 'SET_TOKEN', payload: token})
                    // set the user type
                    dispatch({type: 'SET_USER', payload: response.data.user})
                }).catch(function(error){
                    console.log(error)
                    if(error.response.status == 503){
                        setErrors({'form': 'Invalid credentials'})
                    }
                    if(error.response.status == 422){
                        setErrors(error.response.data.errors)
                    }
                }).catch(error => {})
        });
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
                    <Text color="gray.500">Please login first</Text>
                </Flex>

                <form method="POST" onSubmit={doLogin}>
                    <VStack spacing="1rem" padding="1rem" alignItems="center">
                        <FormControl isInvalid={errors['form']} >
                            <FormErrorMessage >Your credentials is invalid</FormErrorMessage>
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
                        <Spacer height="2rem"/>
                        <VStack>
                            <Button type="submit" colorScheme="blue" width="12rem">Login</Button>
                        </VStack>
                        
                    </VStack>
                </form>
            </Box>
        </Stack>
    )
}

export default Login

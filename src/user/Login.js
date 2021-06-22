import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
} from '@chakra-ui/react';

import apiClient from '../services/api'
import { Context } from '../Store'
import { useHistory } from 'react-router-dom'
  
export default function Login() {

    const history = useHistory()
    const [error, setError] = React.useState([])
    const [state, dispatch] = React.useContext(Context)

    const doLogin = (event) => {
      event.preventDefault()
      const formdata = new FormData(event.target)
      const entries = Object.fromEntries(formdata)

      apiClient.post('/api/login', entries)
      .then(response => {
        console.log(response.data)
        // set token and user of course because i am really bored really just doing this project make
        // me really hate of coding but what do you think?
        // i hope everything gonna be alright
        // this code is certainly the worst of some, but if it's work then what do you blame for
        // oh my lord of the seven skies...

        dispatch({type: 'SET_USER', payload: response.data.user});
        dispatch({type: 'SET_TOKEN', payload: response.data.token})

        history.push('/store/cars')
      })
      .catch(error => {
        setError(error.response.data.errors)
      })
      .catch(error => {
        alert('Login invalid')
        document.location.href = '/store/login'
      })
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              sign in first to use your account preferences
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <form method="POST" onSubmit={(event) => {
                doLogin(event)
              }}>
              <FormControl id="email" isInvalid={error['email']}>
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" />
                <FormErrorMessage>{error['email']}</FormErrorMessage>
              </FormControl>

              <FormControl id="password" isInvalid={error['password']}>
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" />
                <FormErrorMessage>{error['email']}</FormErrorMessage>
              </FormControl>

              <Stack spacing={10}>
                <Button type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  
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

export default function Register() {

    const [error, setError] = React.useState([])
    const [state, dispatch] = React.useContext(Context)

    // saat register ingat juga untuk input ke customer jangan hanya ke user, this is sadge...
    const doRegister = (event) => {
      event.preventDefault()
      const formdata = new FormData(event.target)
      const entries = Object.fromEntries(formdata)

      apiClient.post('/api/register', entries)
      .then(response => {
        console.log(response.data)
        // create new Customer data
        apiClient.post('/api/customers', {
          name: response.data.user.name,
          account: response.data.user.id
        })
        .then(response => {
          alert('Added to Customer table')
        })
        .catch(error => {
          alert('Error adding customer sadge')
        })
        alert('Registered, Please login afterward.')
      })
      .catch(error => {
        setError(error.response.data.errors)
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
            <Heading fontSize={'4xl'}>Sign up for an account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              for purchase/transaction convenience
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <form method="POST" onSubmit={(event) => {
              doRegister(event)
            }}>
            <Stack spacing={4}>

            <FormControl id="name" isInvalid={error['name']}>
                <FormLabel>Your Name</FormLabel>
                <Input name="name" type="name" />
                <FormErrorMessage>{error['name']}</FormErrorMessage>
              </FormControl>

              <FormControl id="email" isInvalid={error['email']}>
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" />
                <FormErrorMessage>{error['email']}</FormErrorMessage>
              </FormControl>

              <FormControl id="password" isInvalid={error['password']}>
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" />
                <FormErrorMessage>{error['password']}</FormErrorMessage>
              </FormControl>

              <FormControl id="password_confirmation" isInvalid={error['password_confirmation']}>
                <FormLabel>Confirm Password</FormLabel>
                <Input name="password_confirmation" type="password" />
                <FormErrorMessage>{error['password_confirmation']}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }

import { Button, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Context } from './Store'
import apiClient from './services/api'

function Preferences() {
    const [state, dispatch] = React.useContext(Context)

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }
    const doUpdate = function(event){
        event.preventDefault()

        const formdata = new FormData(event.target)
        const entries = Object.fromEntries(formdata)

        const updated = Object.assign(state.user, entries)
        
        apiClient.patch('/api/update', updated, config)
        .then(response => {

        })
        .catch(error => {})
    }
    return (
        <form method="POST" onSubmit={doUpdate}>

        <VStack color="gray.700" width="24rem" spacing="1rem" padding="0 1rem">

            <FormControl id="email" size="sm">
                <FormLabel size="sm">Email Address</FormLabel>
                <Input defaultValue={state.user.email} isDisabled name="email" placeholder="Input email" size="sm" bg="white" borderColor="blue.400" />
                <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl id="name" size="sm">
                <FormLabel size="sm">Name</FormLabel>
                <Input defaultValue={state.user.name} name="name" placeholder="Input name" size="sm" bg="white" borderColor="blue.400" />
                <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl id="name" size="sm">
                <FormLabel size="sm">Password</FormLabel>
                <Input name="password" type="password" placeholder="Input password" size="sm" bg="white" borderColor="blue.400" />
                <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl id="name" size="sm">
                <FormLabel size="sm">Confirm Password</FormLabel>
                <Input name="password_confirmation" type="password" placeholder="Password Confirmation" size="sm" bg="white" borderColor="blue.400" />
                <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <Button type="submit" width="12rem" colorScheme="blue" alignSelf="flex-end">Save</Button>
        </VStack>
        </form>
    )
}

export default Preferences

import { FormControl, FormErrorMessage, FormLabel, VStack, Input, Select } from '@chakra-ui/react'
import React from 'react'

import apiClient from '../services/api';
import { Context } from '../Store'


function CarForm({ error, data }) {
    
    return (
        <>
            <VStack spacing="1rem">

            <FormControl id="name" size="sm" isInvalid={error['name']}>
                <FormLabel size="sm">Model Name</FormLabel>
                <Input name="name" defaultValue={data.name && data.name} size="sm"/>
                <FormErrorMessage>{error['name']}</FormErrorMessage>
            </FormControl>
            
            <FormControl id="description" size="sm" isInvalid={error['description']}>
                <FormLabel size="sm">Description</FormLabel>
                <Input name="description" defaultValue={data.description && data.description} size="sm"/>
                <FormErrorMessage>{error['description']}</FormErrorMessage>
            </FormControl>
            </VStack>
        </>
    )
}

export default CarForm

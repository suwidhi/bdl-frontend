import { FormControl, FormErrorMessage, FormLabel, VStack, Input, Select } from '@chakra-ui/react'
import React from 'react'

import apiClient from '../services/api';
import { Context } from '../Store'


function CarForm({ error, data }) {
    
    return (
        <>
            <VStack spacing="1rem">

            <FormControl id="name" size="sm" isInvalid={error['engine']}>
                <FormLabel size="sm">Engine</FormLabel>
                <Input name="engine" defaultValue={data.engine && data.engine} size="sm"/>
                <FormErrorMessage>{error['engine']}</FormErrorMessage>
            </FormControl>
            
            <FormControl id="color" size="sm" isInvalid={error['color']}>
                <FormLabel size="sm">Color</FormLabel>
                <Input name="color" defaultValue={data.color && data.color} size="sm"/>
                <FormErrorMessage>{error['color']}</FormErrorMessage>
            </FormControl>

            <FormControl id="transmission" size="sm" isInvalid={error['transmission']}>
                <FormLabel size="sm">Transmission</FormLabel>
                <Input name="transmission" defaultValue={data.transmission && data.transmission} size="sm"/>
                <FormErrorMessage>{error['transmission']}</FormErrorMessage>
            </FormControl>
            </VStack>
        </>
    )
}

export default CarForm

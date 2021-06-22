import { FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react'
import React from 'react'

function CarTypeForm({ error, data }) {
    return (
        <>
        <VStack spacing="1rem">
            <FormControl id="name" size="sm" isInvalid={error['name']}>
                <FormLabel size="sm">Supplier Name</FormLabel>
                <Input name="name" defaultValue={data.name && data.name} placeholder="Input name" size="sm"/>
                <FormErrorMessage>{error['name']}</FormErrorMessage>
            </FormControl>

            <FormControl id="description" size="sm" isInvalid={error['description']}>
                <FormLabel size="sm">Supplier description</FormLabel>
                <Input name="description" defaultValue={data.description && data.description} placeholder="Input description" size="sm"/>
                <FormErrorMessage>{error['description']}</FormErrorMessage>
            </FormControl>
        </VStack>
        </>
    )
}

export default CarTypeForm

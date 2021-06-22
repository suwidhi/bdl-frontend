import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

function BrandForm({ error, data }) {
    return (
        <>
            <FormControl id="name" size="sm" isInvalid={error['name']}>
            <FormLabel size="sm">Name</FormLabel>
            <Input name="name" defaultValue={data.name && data.name} placeholder="Input name" size="sm"/>
            <FormErrorMessage>{error['name']}</FormErrorMessage>
            </FormControl>
        </>
    )
}

export default BrandForm

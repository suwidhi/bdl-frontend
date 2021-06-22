import { FormControl, FormErrorMessage, FormLabel, Input, Select, VStack } from '@chakra-ui/react'
import React from 'react'

function BrandForm({ error, data }) {
    return (
        <>
        <VStack spacing="1rem">
            
            <FormControl id="name" size="sm" isInvalid={error['name']}>
                <FormLabel size="sm">Name</FormLabel>
                <Input name="name" defaultValue={data.name && data.name} placeholder="Input name" size="sm"/>
                <FormErrorMessage>{error['name']}</FormErrorMessage>
            </FormControl>

            <FormControl id="email" size="sm" isInvalid={error['email']}>
                <FormLabel size="sm">Email</FormLabel>
                <Input name="email" defaultValue={data.email && data.email} placeholder="Input email" size="sm"/>
                <FormErrorMessage>{error['email']}</FormErrorMessage>
            </FormControl>

            <FormControl id="name" size="sm" isInvalid={error['name']}>
                <FormLabel size="sm">Account Type</FormLabel>
                <Select name="type">
                    <option value="1">Automobile</option>
                    <option value="2">Dealer</option>
                    <option value="3">Supplier</option>
                    <option value="4">Manufacturer</option>
                </Select>
                <FormErrorMessage>{error['name']}</FormErrorMessage>
            </FormControl>

            <FormControl>
                <FormLabel size="sm">Password</FormLabel>
                <Input disabled type="text" value="navi" size="sm"/>
            </FormControl>
            
        </VStack>
        </>
    )
}

export default BrandForm

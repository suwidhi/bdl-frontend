import { FormControl, FormErrorMessage, FormLabel, VStack, Input, Select } from '@chakra-ui/react'
import React from 'react'

import apiClient from '../services/api';

function Customer({ error, data }) {
    
    return (
        <>
            <VStack spacing="1rem">

            <FormControl id="name" size="sm" isInvalid={error['name']}>
                <FormLabel size="sm">Name</FormLabel>
                <Input name="name" defaultValue={data.name && data.name} size="sm"/>
                <FormErrorMessage>{error['name']}</FormErrorMessage>
            </FormControl>

            <FormControl id="gender" size="sm" isInvalid={error['gender']}>
                <FormLabel size="sm">Gender</FormLabel>
                <Select name="gender">
                    <option value="M" selected={data.gender =='m'}>Male</option>
                    <option value="F" selected={data.gender =='f'}>Female</option>
                </Select>
                <FormErrorMessage>{error['gender']}</FormErrorMessage>
            </FormControl>

            <FormControl id="address" size="sm" isInvalid={error['address']}>
                <FormLabel size="sm">Address</FormLabel>
                <Input name="address" defaultValue={data.address && data.address} size="sm"/>
                <FormErrorMessage>{error['address']}</FormErrorMessage>
            </FormControl>

            <FormControl id="phone" size="sm" isInvalid={error['phone']}>
                <FormLabel size="sm">Phone</FormLabel>
                <Input name="phone" defaultValue={data.phone && data.phone} size="sm"/>
                <FormErrorMessage>{error['phone']}</FormErrorMessage>
            </FormControl>

            </VStack>
        </>
    )
}

export default Customer

import { FormControl, FormErrorMessage, FormLabel, VStack, Input, Select } from '@chakra-ui/react'
import React from 'react'

import apiClient from '../services/api';
import { Context } from '../Store'

function EmployeeForm({ error, data }) {
    const [state, dispatch] = React.useContext(Context)
    
    const [types, setTypes] = React.useState([])
    const [dealers, setDealers] = React.useState([])

    React.useEffect(function(){
        fetchAll('employeetypes', setTypes)
        fetchAll('dealers', setDealers)
    }, [])

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }

    const fetchAll = (name, setter) => {
        apiClient.get('/api/' + name, config)
        .then(response => {
            setter(response.data)
        })
    }
    
    return (
        <>
            <VStack spacing="1rem">

            <FormControl id="type" size="sm" isInvalid={error['type']}>
                <FormLabel size="sm">Type</FormLabel>
                <Select name="type">
                    {types.map(function(type){
                        return(
                            <option selected={data.type == type.id} value={type.id}>{type.name}</option>
                        )
                    })}
                </Select>
                <FormErrorMessage>{error['type']}</FormErrorMessage>
            </FormControl>
            
            <FormControl id="name" size="sm" isInvalid={error['name']}>
                <FormLabel size="sm">Employee Name</FormLabel>
                <Input name="name" defaultValue={data.name && data.name} size="sm"/>
                <FormErrorMessage>{error['name']}</FormErrorMessage>
            </FormControl>

            <FormControl id="email" size="sm" isInvalid={error['email']}>
                <FormLabel size="sm">Email Address</FormLabel>
                <Input name="email" defaultValue={data.email && data.email} size="sm"/>
                <FormErrorMessage>{error['email']}</FormErrorMessage>
            </FormControl>

            <FormControl id="phone" size="sm" isInvalid={error['phone']}>
                <FormLabel size="sm">Phone Number</FormLabel>
                <Input name="phone" defaultValue={data.phone && data.phone} size="sm"/>
                <FormErrorMessage>{error['phone']}</FormErrorMessage>
            </FormControl>

            <FormControl id="working_date" size="sm" isInvalid={error['working_date']}>
                <FormLabel size="sm">Start Working</FormLabel>
                <Input type="date" name="working_date" defaultValue={data.working_date && data.working_date} size="sm"/>
                <FormErrorMessage>{error['working_date']}</FormErrorMessage>
            </FormControl>

            <FormControl id="address" size="sm" isInvalid={error['address']}>
                <FormLabel size="sm">Address</FormLabel>
                <Input name="address" defaultValue={data.address && data.address} size="sm"/>
                <FormErrorMessage>{error['address']}</FormErrorMessage>
            </FormControl>

            <Input type="hidden" name="dealer" value={
                dealers.filter(function(el){
                    return el.account === state.user.id
                }).length === 1 && dealers.filter(function(el){
                    return el.account === state.user.id
                })[0].id
            }></Input>

            </VStack>
        </>
    )
}

export default EmployeeForm

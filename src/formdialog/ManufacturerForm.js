import { FormControl, FormErrorMessage, FormLabel, Input, VStack, Select } from '@chakra-ui/react'
import React from 'react'

import { Context } from '../Store'
import apiClient from '../services/api'
import { useState } from 'react'

function CarTypeForm({ error, data }) {
    const [state, dispatch] = React.useContext(Context)

    const [manufacturers, setManufacturers] = useState([])

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }

    React.useEffect(function(){
        let mounted = manufacturers.length !== 0
        if(!mounted){
            fetchAll('accounts/4', setManufacturers);
        }

    }, [manufacturers])

    const fetchAll = (name, setter) => {
        apiClient.get('/api/' + name, config)
        .then(response => {
            setter(response.data)
        })
        .catch(error => {
          console.log('Too many request, add a manufacturer account first')
        })
    }

    return (
        <VStack spacing="1rem">
            <FormControl id="name" size="sm" isInvalid={error['name']}>
                <FormLabel size="sm">Manufacturer Name</FormLabel>
                <Input name="name" defaultValue={data.name && data.name} placeholder="Input name" size="sm"/>
                <FormErrorMessage>{error['name']}</FormErrorMessage>
            </FormControl>

            <FormControl id="account" size="sm" isInvalid={error['account']}>
                <FormLabel size="sm">Dealer Account</FormLabel>
                <Select name="account">
                    {
                        manufacturers.map(function(manufacturer){
                            return(
                                <option value={manufacturer.id}>{manufacturer.name}</option>
                            )
                        })
                    }
                </Select>
                <FormErrorMessage>{error['account']}</FormErrorMessage>
            </FormControl>
        </VStack>
    )
}

export default CarTypeForm

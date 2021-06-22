import { FormControl, FormErrorMessage, FormLabel, Input, Select, VStack } from '@chakra-ui/react'
import React from 'react'

import { Context } from '../Store'
import apiClient from '../services/api'
import { useState } from 'react'

function CarTypeForm({ error, data }) {
    const [state, dispatch] = React.useContext(Context)

    const [dealer, setDealer] = useState([])

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }

    React.useEffect(function(){
        let mounted = dealer.length !== 0
        if(!mounted){
            fetchAll('accounts/2', setDealer);
            console.log(dealer)
        }

    }, [dealer])

    const fetchAll = (name, setter) => {
        apiClient.get('/api/' + name, config)
        .then(response => {
            setter(response.data)
        })
        .catch(error => {
          alert('what the fuck')
        })
    }   

    return (
        <VStack>
            <FormControl id="name" size="sm" isInvalid={error['name']}>
                <FormLabel size="sm">Dealer Name</FormLabel>
                <Input name="name" defaultValue={data.name && data.name} placeholder="Input name" size="sm"/>
                <FormErrorMessage>{error['name']}</FormErrorMessage>
            </FormControl>

            <FormControl id="account" size="sm" isInvalid={error['account']}>
                <FormLabel size="sm">Dealer Account</FormLabel>
                <Select name="account">
                    {
                        dealer.map(function(deal){
                            return(
                                <option value={deal.id}>{deal.email}</option>
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

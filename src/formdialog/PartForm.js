import { FormControl, FormErrorMessage, FormLabel, VStack, Input, Select } from '@chakra-ui/react'
import React from 'react'

import apiClient from '../services/api';
import { Context } from '../Store'

function PartForm({ error, data }) {
    const [suppliers, setSuppliers] = React.useState([])
    const [manufacturers, setManufacturers] = React.useState([])
    const [models, setModels] = React.useState([])
    const [state, dispatch] = React.useContext(Context)

    React.useEffect(function(){
        fetchAll('suppliers', setSuppliers)
        fetchAll('manufacturers', setManufacturers)
        fetchAll('carmodels', setModels)
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
                
            <FormControl id="name" size="sm" isInvalid={error['code']}>
                <FormLabel size="sm">Code</FormLabel>
                <Input name="code" defaultValue={data.code && data.code} size="sm"/>
                <FormErrorMessage>{error['code']}</FormErrorMessage>
            </FormControl>

            <FormControl id="supplier" size="sm" isInvalid={error['supplier']}>
                <FormLabel size="sm">Supplier</FormLabel>
                <Select name="supplier">
                    <option value={0}>None</option>

                    {suppliers.map(function(supplier){
                        return(
                            <option selected={data.supplier === supplier.id} value={supplier.id}>{supplier.name}</option>
                        )
                    })}
                </Select>
                <FormErrorMessage>{error['brand']}</FormErrorMessage>
            </FormControl>
            <FormControl id="manufacturer" size="sm" isInvalid={error['manufacturer']}>
                <FormLabel size="sm">Manufacturer</FormLabel>
                <Select name="manufacturer">
                    <option value={0}>None</option>
                    {manufacturers.map(function(manufacturer){
                        return(
                            <option selected={data.manufacturer == manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                        )
                    })}
                </Select>
                <FormErrorMessage>{error['manufacturer']}</FormErrorMessage>
            </FormControl>

            <FormControl id="model" size="sm" isInvalid={error['model']}>
                <FormLabel size="sm">Model</FormLabel>
                <Select name="model">
                    {models.map(function(model){
                        return(
                            <option selected={data.model == model.id} value={model.id}>{model.name}</option>
                        )
                    })}
                </Select>
                <FormErrorMessage>{error['model']}</FormErrorMessage>
            </FormControl>

            <FormControl id="name" size="sm" isInvalid={error['name']}>
                <FormLabel size="sm">Part Name</FormLabel>
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

export default PartForm

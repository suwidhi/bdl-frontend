import { FormControl, FormErrorMessage, FormLabel, VStack, Input, Select } from '@chakra-ui/react'
import React from 'react'

import apiClient from '../services/api';
import { Context } from '../Store'

function CarForm({ error, data }) {
    const [state, dispatch] = React.useContext(Context)
    
    const [brands, setBrands] = React.useState([])
    const [types, setTypes] = React.useState([])
    const [options, setOptions] = React.useState([])
    const [models, setModels] = React.useState([])

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }

    React.useEffect(function(){
        fetchAll('brands', setBrands)
        fetchAll('cartypes', setTypes)
        fetchAll('caroptions', setOptions)
        fetchAll('carmodels', setModels)
    }, [])

    const fetchAll = (name, setter) => {
        apiClient.get('/api/' + name, config)
        .then(response => {
            setter(response.data)
        })
    }
    
    return (
        <>
            <VStack spacing="1rem">

            <FormControl id="vin" size="sm" isInvalid={error['vin']}>
                <FormLabel size="sm">VIN</FormLabel>
                <Input name="vin" defaultValue={data.vin} size="sm"/>
                <FormErrorMessage>{error['vin']}</FormErrorMessage>
            </FormControl>

            <FormControl id="brand" size="sm" isInvalid={error['brand']}>
                <FormLabel size="sm">Brand</FormLabel>
                <Select name="brand">
                    {brands.map(function(brand){
                        return(
                            <option selected={data.brand === brand.id} value={brand.id}>{brand.name}</option>
                        )
                    })}
                </Select>
                <FormErrorMessage>{error['brand']}</FormErrorMessage>
            </FormControl>

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

            <FormControl id="option" size="sm" isInvalid={error['option']}>
                <FormLabel size="sm">Model</FormLabel>
                <Select name="option">
                    {options.map(function(option){
                        return(
                            <option selected={data.option == option.id} value={option.id}>{option.color} Color, {option.transmission} Transmission</option>
                        )
                    })}
                </Select>
                <FormErrorMessage>{error['type']}</FormErrorMessage>
            </FormControl>

            <FormControl id="price" size="sm" isInvalid={error['price']}>
                <FormLabel size="sm">Price</FormLabel>  
                <Input name="price" defaultValue={data.price && data.price} size="sm"/>
                <FormErrorMessage>{error['price']}</FormErrorMessage>
            </FormControl>
            </VStack>
        </>
    )
}

export default CarForm

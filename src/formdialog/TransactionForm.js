import { FormControl, FormErrorMessage, FormLabel, VStack, Input, Select, Badge } from '@chakra-ui/react'
import React from 'react'

import { Context } from '../Store'
import apiClient from '../services/api';

function TransactionForm({ error, data }) {
    
    const [brands, setBrands] = React.useState([])
    const [models, setModels] = React.useState([])
    const [dealers, setDealers] = React.useState([])
    const [employees, setEmployees] = React.useState([])
    const [transactionTypes, setTransactionTypes] = React.useState([])
    const [statuses, setStatuses] = React.useState([])

    React.useEffect(function(){
        fetchAll('brands', setBrands)
        fetchAll('carmodels', setModels)
        fetchAll('dealers', setDealers)
        fetchAll('employees', setEmployees)
        fetchAll('transactiontypes', setTransactionTypes)
        fetchAll('transactionstatuses', setStatuses)
    }, [])
    
    const [state, dispatch] = React.useContext(Context)
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

            <FormControl id="model" size="sm" isInvalid={error['model']}>
                <FormLabel size="sm">Vehicle Model</FormLabel>
                <Select name="model">
                    {models.map(function(model){
                        return(
                            <option selected={data.model === model.id} value={model.id}>{model.id} - {model.name}</option>
                        )
                    })}
                </Select>
                <FormErrorMessage>{error['model']}</FormErrorMessage>
            </FormControl>

            <FormControl id="employee" size="sm" isInvalid={error['employee']}>
                <FormLabel size="sm">Admin</FormLabel>
                <Select name="employee">
                    {employees.map(function(employee){
                        return(
                            <option selected={data.employee === employee.id} value={employee.id}>{employee.id} - {employee.name}</option>
                        )
                    })}
                </Select>
                <FormErrorMessage>{error['employee']}</FormErrorMessage>
            </FormControl>

            <FormControl id="amount" size="sm" isInvalid={error['amount']}>
                <FormLabel size="sm">Amount</FormLabel>
                <Input type="number" name="amount"></Input>
                <FormErrorMessage>{error['amount']}</FormErrorMessage>
            </FormControl>

            <FormControl id="type" size="sm" isInvalid={error['type']}>
                <FormLabel size="sm">Transaction Type</FormLabel>
                <Select name="type">
                    {transactionTypes.map(function(type){
                        return(
                            <option selected={data.type == type.id} value={type.id}>{type.name}</option>
                        )
                    })}
                </Select>
                <FormErrorMessage>{error['type']}</FormErrorMessage>
            </FormControl>

            <Input type="hidden" name="dealer" value={
                dealers.filter(function(el){
                    return el.account === state.user.id
                }).length === 1 && dealers.filter(function(el){
                    return el.account === state.user.id
                })[0].id
            }></Input>

            <Input type="hidden" name="status"  value="1"></Input>

            </VStack>
        </>
    )
}

export default TransactionForm

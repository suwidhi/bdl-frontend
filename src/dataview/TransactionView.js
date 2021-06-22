import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Badge,
  } from '@chakra-ui/react';
import DeleteDialog from '../components/DeleteDialog';

import apiClient from '../services/api';
import { Context } from '../Store'

function TransactionView({ dataset, deleteCallback, updateForm, openFormCallback }) {

    const [models, setModels] = React.useState([])
    const [employees, setEmployees] = React.useState([])
    const [transactionTypes, setTransactionTypes] = React.useState([])
    const [statuses, setStatuses] = React.useState([])

    const [state, dispatch] = React.useContext(Context)
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }
    React.useEffect(function(){
        fetchAll('carmodels', setModels)
        fetchAll('employees', setEmployees)
        fetchAll('transactiontypes', setTransactionTypes)
        fetchAll('transactionstatuses', setStatuses)
    }, [])

    const fetchAll = (name, setter) => {
        apiClient.get('/api/' + name, config)
        .then(response => {
            setter(response.data)
        }).catch(error => {})
    }

    const findColor = (status) => {
        console.log(status)
        switch(status){
            case 'Requested':
                return 'yellow';
            case 'Accepted':
                return 'green';
        }
    }

    return (
        <Table variant="striped" textColor="gray.700" colorScheme="blackAlpha" size="md">
            <Thead>
            <Tr>
                {
                    dataset.head.map(function(head){
                        return(
                            <Th>{head}</Th>
                        )
                    })
                }
                </Tr>
            </Thead>
            <Tbody fontSize="sm">
                {
                    dataset.body.map(function(item){
                        return(
                            <Tr>
                                <Td>
                                    {
                                        employees.map(function(employee){
                                            if(employee.id === item.employee){
                                                return(
                                                    employee.name
                                                )
                                            }
                                        })
                                    }
                                </Td>
                                <Td>
                                    {
                                        transactionTypes.map(function(type){
                                            if(type.id === item.type){
                                                return(
                                                    type.name
                                                )
                                            }
                                        })
                                    }
                                </Td>
                                <Td>
                                    {
                                        models.map(function(model){
                                            if(model.id === item.model){
                                                return(
                                                    model.name
                                                )
                                            }
                                        })
                                    }
                                </Td>
                                <Td>{ item.amount }</Td>
                                <Td>
                                    {
                                        statuses.map(function(status){
                                            if(status.id === item.status){
                                                return(
                                                    <Badge colorScheme={findColor(status.name)}>
                                                    { status.name }
                                                    </Badge>
                                                )
                                            }
                                        })
                                    }
                                </Td>
                                <Td>{ item.created_at }</Td>
                            </Tr>
                        )
                    })
                }
            </Tbody>
        </Table>
    )
}

export default TransactionView

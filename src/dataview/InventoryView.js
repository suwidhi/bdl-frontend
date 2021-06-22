import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
  } from '@chakra-ui/react';
import DeleteDialog from '../components/DeleteDialog';

import apiClient from '../services/api';
import { Context } from '../Store'

function InventoryView({ dataset, deleteCallback, updateForm, openFormCallback }) {
    const [state, dispatch] = React.useContext(Context)

    const [suppliers, setSuppliers] = React.useState([])
    const [manufacturers, setManufacturers] = React.useState([])
    const [models, setModels] = React.useState([])

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
        }).catch(error => {})
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
                        console.log(item)
                        return(
                            <Tr>
                                <Td>{item.car}</Td>
                                <Td>{item.sold == 1 ? 'Yes' : 'No'}</Td>
                                <Td>{item.created_at}</Td>
                            </Tr>
                        )
                    })
                }
            </Tbody>
        </Table>
    )
}

export default InventoryView

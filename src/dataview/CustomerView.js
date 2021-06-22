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


function IndividualCustomerView({ dataset, deleteCallback, updateForm, openFormCallback }) {
    const [state, dispatch] = React.useContext(Context)

    const [brands, setBrands] = React.useState([])
    const [types, setTypes] = React.useState([])

    React.useEffect(function(){
        fetchAll('brands', setBrands)
        fetchAll('cartypes', setTypes)
    }, [])

    const fetchAll = (name, setter) => {
        apiClient.get('/api/' + name, config)
        .then(response => {
            setter(response.data)
        }).catch(error => {})
    }
    
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
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
                <Th>Options</Th>
            </Tr>
            </Thead>
            <Tbody fontSize="sm">
                {
                    dataset.body.map(function(item){
                        return(
                            <Tr>
                                <Td>{item.name}</Td>
                                <Td>
                                    {
                                        item.gender === 'm' ? 'Male' : 'Female'
                                    }
                                </Td>
                                <Td>{item.address}</Td>
                                <Td>{item.phone}</Td>
                                <Td width="14rem">
                                <Button colorScheme="gray" leftIcon={<i className="la la-edit"></i>} onClick={() => {
                                    openFormCallback(item)
                                }} size="xs" marginRight=".5rem" >Edit</Button>
                                    <DeleteDialog item={item} callback={deleteCallback} />
                                </Td>
                            </Tr>
                        )
                    })
                }
            </Tbody>
        </Table>
    )
}

export default IndividualCustomerView

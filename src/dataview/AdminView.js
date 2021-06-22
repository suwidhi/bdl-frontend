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

function PartView({ dataset, deleteCallback, updateForm, openFormCallback }) {

    const [state, dispatch] = React.useContext(Context)
    const [types, setTypes] = React.useState([])

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }

    React.useEffect(function(){
        fetchAll('usertypes', setTypes)
    }, [])

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
                <Th>Options</Th>
            </Tr>
            </Thead>
            <Tbody fontSize="sm">
                {
                    dataset.body.map(function(item){
                        return(
                            <Tr>
                                <Td>{item.name}</Td>
                                <Td>{item.email}</Td>
                                <Td>
                                    {
                                        types.map(function(type){
                                            if(type.id === item.type){
                                                return(
                                                    type.name
                                                )
                                            }
                                        })
                                    }
                                </Td>
                                <Td>{ item.id }</Td>
                                <Td width="14rem">
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

export default PartView

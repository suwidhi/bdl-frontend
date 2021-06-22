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

function TableView({ dataset, deleteCallback, updateForm, openFormCallback }) {
    const [types, setTypes] = React.useState([])
    const [state, dispatch] = React.useContext(Context)

    React.useEffect(function(){
        fetchAll('employeetypes', setTypes)
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
                <Th>Options</Th>
            </Tr>
            </Thead>
            <Tbody fontSize="sm">
                {
                    dataset.body.map(function(item){
                        return(
                            <Tr>
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
                                <Td>{ item.name }</Td>
                                <Td>{ item.email }</Td>
                                <Td>{ item.phone }</Td>
                                <Td>{ item.working_date }</Td>
                                <Td>{ item.address }</Td>

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

export default TableView

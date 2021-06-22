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
                <Th>Options</Th>
            </Tr>
            </Thead>
            <Tbody fontSize="sm">
                {
                    dataset.body.map(function(item){
                        return(
                            <Tr>
                                <Td>{item.code}</Td>
                                <Td>
                                    {
                                        suppliers.map(function(supplier){
                                            if(supplier.id === item.supplier){
                                                return(
                                                    supplier.name
                                                )
                                            }
                                        })
                                    }
                                </Td>
                                <Td>
                                    {
                                        manufacturers.map(function(manufacturer){
                                            if(manufacturer.id === item.manufacturer){
                                                return(
                                                    manufacturer.name
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
                                <Td>{item.name}</Td>
                                <Td>{ item.description }</Td>
                                
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

export default PartView

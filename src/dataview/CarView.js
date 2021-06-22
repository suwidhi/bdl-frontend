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
    const [state, dispatch] = React.useContext(Context)

    const [brands, setBrands] = React.useState([])
    const [types, setTypes] = React.useState([])

    React.useEffect(function(){
        fetchAll('brands', setBrands)
        fetchAll('cartypes', setTypes)
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

    console.log(brands)

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
                                <Td>{item.vin}</Td>
                                <Td>
                                    {
                                        brands.map(function(brand){
                                            if(brand.id === item.brand){
                                                return(
                                                    brand.name
                                                )
                                            }
                                        })
                                    }
                                </Td>
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
                                <Td>{item.option}</Td>
                                <Td>{item.price}</Td>
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

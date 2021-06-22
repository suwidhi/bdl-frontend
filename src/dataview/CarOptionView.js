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
                                <Td>{ item.engine }</Td>
                                <Td>{item.color}</Td>
                                <Td>{ item.transmission }</Td>
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

import React from 'react'
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  useColorModeValue,
  createIcon,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

import apiClient from '../services/api'
import { Context } from '../Store'
  
export default function Checkouted() {

  const [state, dispatch] = React.useContext(Context)
  const [sales, setSales] = React.useState([]);

  React.useEffect(function(){
    if(state.token === ''){
      alert('Please login first')
      document.location.href = '/store/login'
    }
    fetchAll('unpaid/' + state.user.id , setSales)
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
        console.log(response.data)
    })
  }

  const doPay = (sale) => {
    apiClient.post('/api/pay/' + sale.inventory_id + '/' + sale.sales_id, {}, config)
    .then(response => {
      alert('Payment succesful')
    })
    .catch(error => {
      alert('Failed to pay')
    })
  }

  return (
    <Flex padding="1rem" direction="column" alignItems="center">
      <Text fontWeight="bold" fontSize="xl" margin="2rem 0">List of user transaction</Text>

      <Table variant="simple" width="28rem">
        <TableCaption>Just click pay to pay (simulation only)</TableCaption>
        <Thead>
          <Tr>
            <Th>Item</Th>
            <Th>Provider</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
            {
              sales.map(function(sale){
                return(
                  <Tr>
                    <Td>{ sale.vin }</Td>
                    <Td>{ sale.dealer }</Td>
                    <Td>{ sale.created_at }</Td>
                    <Td>
                      {
                        sale.paid == 0 && <Button
                        onClick={() => {
                          doPay(sale)
                        }}
                        >Pay</Button>
                      }

                      {
                        sale.paid == 1 && <Text>Paid</Text>
                      }
                      
                      </Td>
                  </Tr>
                )
              })
            }
      
        </Tbody>
      </Table>

    </Flex>
  )
}
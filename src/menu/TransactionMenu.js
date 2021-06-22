import React from 'react'
import {
    Text,
    Flex,
    Button,
    Box,
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom'

function TransactionMenu() {

    const history = useHistory()

    const menuItems = [
        {
          'label': 'Admin Menu',
          'items': [
            // {
            //   'link': '/admin/transactionstatuses',
            //   'label': 'Transaction Status',
            //   'icon' : <i className="la la-tasks"></i>,
            // },
            // {
            //   'link': '/admin/transactiontypes',
            //   'label': 'Transaction Types',
            //   'icon' : <i className="la la-quote-left"></i>,
            // },
            {
              'link': '/admin/transactions',
              'label': 'Transaction',
              'icon' : <i className="la la-money-check"></i>,
            },
            {
              'link': '/admin/inventories',
              'label': 'Inventory',
              'icon' : <i className="la la-file-alt"></i>,
            },
          ]
        }
    ]

    return (
        <Flex direction="column">
            {
            menuItems.map(function(menu){
                return(
                <>
                {/* <Text fontSize="xs" fontWeight="bold" paddingLeft=".3rem" marginBottom=".5rem" marginTop="1rem">{menu.label}</Text> */}
                {
                    menu.items.map(function(item){
                    return(
                        <Button 
                        size="md" 
                        justifyContent="flex-start" 
                        colorScheme="whiteAlpha" 
                        bg="transparent"
                        leftIcon={item.icon}
                        fontWeight="normal"
                        borderRadius="3px"
                        onClick={function() {
                          history.push(item.link)
                        }}
                        >{item.label}</Button>
                    )
                    })
                }
                </>
                )
            })
            }

        </Flex>
    )
}

export default TransactionMenu

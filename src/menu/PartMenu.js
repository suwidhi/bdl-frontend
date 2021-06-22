import React from 'react'
import {
    Text,
    Flex,
    Button,
    Box,
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom'

function PartMenu() {

    const history = useHistory()

    const menuItems = [
        {
          'label': 'Admin Menu',
          'items': [
            {
              'link': '/admin/parts',
              'label': 'Parts',
              'icon' : <i className="la la-puzzle-piece"></i>,
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

export default PartMenu

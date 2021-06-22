import React from 'react'
import {
    Text,
    Flex,
    Button,
    Box,
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom'

function CarMenu() {

    const history = useHistory()

    const menuItems = [
        {
          'label': 'Admin Menu',
          'items': [
            {
              'link': '/admin/brands',
              'label': 'Brand',
              'icon' : <i className="la la-copyright"></i>,
            },
            {
              'link': '/admin/cartypes',
              'label': 'Car Type',
              'icon' : <i className="la la-car-side"></i>,
            },
            ,
            {
              'link': '/admin/carmodels',
              'label': 'Car Model',
              'icon' : <i className="la la-truck-pickup"></i>,
            },
            {
              'link': '/admin/caroptions',
              'label': 'Car Options',
              'icon' : <i className="la la-taxi"></i>,
            },
            {
              'link': '/admin/cars',
              'label': 'Cars',
              'icon' : <i className="la la-car-alt"></i>,
            }
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

export default CarMenu

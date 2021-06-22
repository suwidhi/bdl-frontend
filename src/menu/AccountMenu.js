import React from 'react'
import {
    Text,
    Flex,
    Button,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

function AccountMenu() {

    const history = useHistory();
    const menuItems = [
        {
            'label': 'User Menu',
            'items': [
            {
                'link': '/admin/admins',
                'label': 'Create Account',
                'icon' : <i className="la la-user-plus"></i>,
            },
            {
                'link': '/admin/dealers',
                'label': 'Dealer',
                'icon' : <i className="la la-store"></i>,
            },
            {
                'link': '/admin/manufacturers',
                'label': 'Manufacturer',
                'icon' : <i className="la la-industry"></i>,
            },
            {
                'link': '/admin/suppliers',
                'label': 'Supplier',
                'icon' : <i className="la la-boxes"></i>,
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

export default AccountMenu

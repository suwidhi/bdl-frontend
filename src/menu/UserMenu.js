import React from 'react'
import {
    Text,
    Flex,
    Button,
} from '@chakra-ui/react';

function UserMenu() {
    const menuItems = [
        {
            'label': 'My Account',
            'items': [
            {
                'link': '/admin/myaccount',
                'label': 'My Account',
                'icon' : <i className="la la-user-cog"></i>,
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

export default UserMenu

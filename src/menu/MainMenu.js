import React from 'react'
import {
    Text,
    Flex,
    Button,
} from '@chakra-ui/react';

function MainMenu() {
    const menuItems = [
        {
            'label': 'User Menu',
            'items': [
            {
                'link': '/search',
                'label': 'Search',
                'icon' : <i className="la la-search"></i>,
            },
            {
                'link': '/contact',
                'label': 'Contact',
                'icon' : <i className="la la-envelope"></i>,
            },
            {
                'link': '/about',
                'label': 'About',
                'icon' : <i className="la la-info-circle"></i>,
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

export default MainMenu

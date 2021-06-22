import { Box, Button, Flex, HStack, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, VStack,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
 } from '@chakra-ui/react'
import React from 'react'

import apiClient from './services/api'

function Report() {

    const [units, setUnits] = React.useState([]);
    const [amounts, setAmounts] = React.useState([]);

    React.useEffect(function(){
        fetchData()
    }, [])

    const fetchData = function() {
        apiClient.get('/api/topbrands')
        .then(response => {
            setAmounts(response.data)
        }).catch(error => {})

        apiClient.get('/api/topunits')
        .then(response => {
            setUnits(response.data)
        }).catch(error => {})
    }

    return (
        <VStack padding="1rem" alignItems="flex-start" spacing="2rem">
            <Text color="gray.900" fontWeight="bold" margin="1rem 0">Top Brand Sell</Text>
            <HStack margin="0 1rem 1rem 0">
                {
                    units.map(function(item) {
                        return(
                            <Box width="8rem">
                                <Stat colorScheme="blue" color="gray.600" bgColor="gray.100" padding="1rem">
                                    <StatLabel>Brand</StatLabel>
                                    <StatNumber>{ item.brand }</StatNumber>
                                    <StatHelpText>${ item.total }</StatHelpText>
                                </Stat>
                                </Box>
                        )   
                    })
                }
                
            </HStack>

            <Text color="gray.900" fontWeight="bold" margin="1rem 0">Top Brand Sell</Text>
            <HStack margin="0 1rem 1rem 0">
                {
                    amounts.map(function(item) {
                        return(
                            <Box width="8rem">
                                <Stat colorScheme="blue" color="gray.600" bgColor="gray.100" padding="1rem">
                                    <StatLabel>Brand</StatLabel>
                                    <StatNumber>{ item.brand }</StatNumber>
                                    <StatHelpText>{ item.total } Units</StatHelpText>
                                </Stat>
                                </Box>
                        )   
                    })
                }
                
            </HStack>

            <HStack>
                <Text color="gray.900">Export data to something</Text>
            </HStack>

            <Popover>
                <PopoverTrigger>
                    <Button variant="link" colorScheme="blue">Export?</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader color="gray.900">Copy Paste this JSON</PopoverHeader>
                    <PopoverBody color="gray.700">{JSON.stringify({
                        'top_unit': units,
                        'top_amount' : amounts
                    })}</PopoverBody>
                </PopoverContent>
            </Popover>

        </VStack>
        
    )
}

export default Report

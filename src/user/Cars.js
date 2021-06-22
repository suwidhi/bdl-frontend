import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Text,
    VStack,
  } from "@chakra-ui/react"
import React from 'react'
import Product from './components/Product'

import apiClient from '../services/api'
import { Context } from '../Store'

export default function Cars() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [state, dispatch] = React.useContext(Context)
    const [dataset, setData] = React.useState([]);

    const [current, setCurrent] = React.useState([]);

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + state.token
        }
    }

    const callback = (data) => {
        onOpen()

        apiClient.get('/api/getone' + '/' + data.dealer_id + '/' + data.model_id)
        .then(response => {
            let data = response.data
            if(data.length > 0){
                data = data[0]
            }
            setCurrent([data])
            console.log(data)
        })
    }

    React.useEffect(function(){
        fetchData()
    }, [])

    const fetchData = function() {
        apiClient.get('/api/products')
        .then(response => {
            setData(response.data)
        }).catch(error => {})
    }

    const doPurchase = function() {
        apiClient.post('/api/purchase', {
            customer: state.user.id,
            inventory: current[0].inv_id
        }, config)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            alert('Transaction failed')
        })
    }

    return (
        <Box>
            <Box display="inline-flex">
                {
                    dataset.map(function(item){
                        return (
                            <Product identifier="VIN001" callback={callback} 
                            data={item}
                            />
                        )
                    })
                }
                
            </Box>

                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Purchase Confirmation</ModalHeader>
                <ModalCloseButton />

                <ModalBody pb={6}>
                    <VStack spacing="1rem" alignItems="flex-start" padding="1rem">

                        {
                        current.map(function(item){
                            return(
                                <>
                                <Box>
                                    <Text fontWeight="bold">VIN</Text>    
                                    <Text color="gray.700">{item.car}</Text>
                                </Box>

                                <Box>
                                    <Text fontWeight="bold">Dealer</Text>    
                                    <Text color="gray.700">{item.name}</Text>
                                </Box>

                                <Box>
                                    <Text fontWeight="bold">Price</Text>    
                                    <Text color="gray.700">{item.price}</Text>
                                </Box>
                                </>
                            )
                        }) 
                        }
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={doPurchase}>
                    Confirm Purchase
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>

    )
}

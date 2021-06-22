import React from 'react'
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
  Button,
} from '@chakra-ui/react';

import { Context } from '../../Store'
import { useHistory } from 'react-router-dom'

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box d="flex" alignItems="center">
      <Text fontSize="xs">STOCK</Text>
    </Box>
  );
}

function Product({ callback, identifier, data }) {
  const history = useHistory();

  const [state, dispatch] = React.useContext(Context)
  
  const doBuy = () => {
    if(state.token === ''){
      alert('You\'re not logged in. Please login first')
      history.push('/store/login')
    } else {
      callback(data )
      console.log(data)
    }
  }

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      shadow="md"
      position="relative"
      margin="1rem 0 0 1rem"
      width="14rem"
      >

      <Image
        src={'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'}
        htmlWidth="100%"
        htmlHeight="auto"
        fit="cover"
        height="8rem"
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
        </Box>
        <Flex mt="1" justifyContent="space-between" alignContent="center" alignItems="center">
          <Box
            fontSize="md"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated>
            {data.brand} {data.model}
          </Box>
        </Flex>

        <Flex justifyContent="space-between" alignContent="center" alignItems="center">
          <Flex direction="column">
            <Box fontSize="1xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color={'gray.600'} fontSize="lg">
                $
              </Box>
              {data.price}
            </Box>
            <Box>
              Stock: {data.stock}
            </Box>
          </Flex>

          <Flex justifyContent="flex-end">
            <Tooltip
                label="Buy this car"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1em'}>
                <Button
                  onClick={() => {
                    doBuy(data)
                  }}
                >Buy</Button>
              </Tooltip>
          </Flex>
        </Flex>

        
      </Box>
    </Box>
  );
}

export default Product;

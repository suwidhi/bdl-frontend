import React from 'react';
import {
  ChakraProvider,
  Flex,
  Box,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Form,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useDisclosure,
  Lorem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Stack,
  Button,
  Text,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { FaDownload } from 'react-icons/fa';

function App() {
  
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
    },
    {
      'label': 'Admin Menu',
      'items': [
        {
          'link': '/employees',
          'label': 'Employee',
          'icon' : <i className="la la-user-alt"></i>,
        },
        {
          'link': '/vehicles',
          'label': 'Vehicle',
          'icon' : <i className="la la-car"></i>,
        },
        {
          'link': '/transportations',
          'label': 'Transportation',
          'icon' : <i className="la la-bus"></i>,
        },
        {
          'link': '/reports',
          'label': 'Report',
          'icon' : <i className="la la-file-alt"></i>,
        }
      ]
    }
  ]

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <ChakraProvider>
      
      <Flex color="white" height="100%">
        <Box className="aside" bg="messenger.600" width="64" padding="1rem">
          <Stack>
            <Box borderBottom="1px solid #ffffff5f" paddingBottom="1rem" padding="1rem">
              <Text fontSize="4xl" fontWeight="bold" letterSpacing=".25rem">NAVI</Text>
              <Text fontWeight="light" fontSize="s" letterSpacing=".35em">AUTOMOBILE</Text>
            </Box>
            <Box>
              <Stack>
                <Flex direction="column">
                  {
                    menuItems.map(function(menu){
                      return(
                        <>
                        <Text fontSize="xs" fontWeight="bold" paddingLeft=".3rem" marginBottom=".5rem" marginTop="1rem">{menu.label}</Text>
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
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box className="main" flex="1">
          <Flex direction="column" height="100%">
            <Box bg="white" height="14" bg="white" boxShadow="0 0 3px 1px #0000001f" zIndex="1">
              <Flex height="100%" alignItems="center" padding="0 1rem">
                <Box>
                  <Text color="gray.900" fontWeight="semibold">Welcome To Navi Automobile</Text>
                </Box>
                <Spacer />
                <Box>
                  <Menu colorScheme="orange">
                    <MenuButton 
                    as={Button} 
                    rightIcon={ <i className="la la-angle-down"></i>}
                    bgColor="gray.50"
                    textColor="gray.700"
                    fontWeight="normal"
                    height="2.3rem"
                    >
                      Suwidiana Ketut
                    </MenuButton>
                    <MenuList textColor="gray.700">
                      <MenuItem icon={<i className="la la-sliders-h"></i>}>Preferences</MenuItem>
                      <MenuItem icon={<i className="la la-sign-out-alt"></i>}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
            </Box>
            <Box flex="1" bg="#fcfcfc" padding="1rem .5rem" overflowY="auto">
              <Table variant="striped" textColor="gray.700" colorScheme="blackAlpha" size="md">
                <Thead>
                  <Tr>
                    <Th>Type</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Working Date</Th>
                    <Th>Address</Th>
                    <Th>Options</Th>
                  </Tr>
                </Thead>
                <Tbody fontSize="sm">
                  <Tr>
                    <Td>Manager </Td>
                    <Td>Suwidiana</Td>
                    <Td>suwidhi@gmail.com</Td>
                    <Td>078134081234</Td>
                    <Td>12-12-2020</Td>
                    <Td>Jalan Aspal</Td>
                    <Td width="14rem">
                      <Button size="xs" leftIcon={<i className="la la-edit"></i>} marginRight=".5rem">Edit</Button>
                      <Button size="xs" leftIcon={<i className="la la-trash"></i>}>Delete</Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Manager </Td>
                    <Td>Suwidiana</Td>
                    <Td>suwidhi@gmail.com</Td>
                    <Td>078134081234</Td>
                    <Td>12-12-2020</Td>
                    <Td>Jalan Aspal</Td>
                    <Td width="14rem">
                      <Button size="xs" leftIcon={<i className="la la-edit"></i>} marginRight=".5rem">Edit</Button>
                      <Button size="xs" leftIcon={<i className="la la-trash"></i>}>Delete</Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Manager </Td>
                    <Td>Suwidiana</Td>
                    <Td>suwidhi@gmail.com</Td>
                    <Td>078134081234</Td>
                    <Td>12-12-2020</Td>
                    <Td>Jalan Aspal</Td>
                    <Td width="14rem">
                      <Button size="xs" leftIcon={<i className="la la-edit"></i>} marginRight=".5rem">Edit</Button>
                      <Button size="xs" leftIcon={<i className="la la-trash"></i>}>Delete</Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Manager </Td>
                    <Td>Suwidiana</Td>
                    <Td>suwidhi@gmail.com</Td>
                    <Td>078134081234</Td>
                    <Td>12-12-2020</Td>
                    <Td>Jalan Aspal</Td>
                    <Td width="14rem">
                      <Button size="xs" leftIcon={<i className="la la-edit"></i>} marginRight=".5rem">Edit</Button>
                      <Button size="xs" leftIcon={<i className="la la-trash"></i>}>Delete</Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Manager </Td>
                    <Td>Suwidiana</Td>
                    <Td>suwidhi@gmail.com</Td>
                    <Td>078134081234</Td>
                    <Td>12-12-2020</Td>
                    <Td>Jalan Aspal</Td>
                    <Td width="14rem">
                      <Button size="xs" leftIcon={<i className="la la-edit"></i>} marginRight=".5rem">Edit</Button>
                      <Button size="xs" leftIcon={<i className="la la-trash"></i>}>Delete</Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Box position="absolute" bottom="1rem" right="1rem" overflow="hidden">
                <Button colorScheme="blue" onClick={onOpen} leftIcon={<i class="la la-plus"></i>}>Create New</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader fontSize="sm">Create new data</ModalHeader>
                    <ModalCloseButton size="sm"/>
                    <ModalBody>
                      <form>
                        <FormControl>
                          <FormLabel>Type</FormLabel>
                          <Select placeholder="Select type" size="sm">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                          </Select>
                        </FormControl>
                        <FormControl id="name" isRequired size="sm" isInvalid={true}>
                          <FormLabel size="sm">Name</FormLabel>
                          <Input placeholder="Input your name" size="sm"/>
                          <FormErrorMessage>Name field is required</FormErrorMessage>
                        </FormControl>
                      </form>
                    </ModalBody>

                    <ModalFooter>
                      <Button mr={3} onClick={onClose} size="sm" variant="solid" fontWeight="normal" leftIcon={<i className="la la-times"></i>}>
                        Close
                      </Button>
                      <Button loadingText="Saving" isLoading size="sm" colorScheme="blue" leftIcon={<i className="la la-save"></i>} fontWeight="normal">Save</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>

    </ChakraProvider>
  );
}

export default App;

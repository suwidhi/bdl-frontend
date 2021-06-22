import React from 'react'
import {
    Flex,
    Box,
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Stack,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
  } from '@chakra-ui/react';
import { Route, useHistory } from 'react-router-dom'
import Preferences from './Preferences'
import Register from './Register'
import Report from './Report'

import CarTypeManager from './manager/CarTypeManager';
import BrandManager from './manager/BrandManager';
import CarManager from './manager/CarManager';
import CarModelManager from './manager/CarModelManager';
import CarOptionManager from './manager/CarOptionManager';
import DealerManager from './manager/DealerManager';
import EmployeeTypeManager from './manager/EmployeeTypeManager';
import EmployeeManager from './manager/EmployeeManager';
import SupplierManager from './manager/SupplierManager';
import ManufacturerManager from './manager/ManufacturerManager';
import PartManager from './manager/PartManager';
import TransactionTypeManager from './manager/TransactionTypeManager';
import TransactionStatusManager from './manager/TransactionStatusManager';
import TransactionManager from './manager/TransactionManager';
import CustomerManager from './manager/CustomerManager';
import TransactionRequestManager from './manager/TransactionRequestManager';
import InventoryManager from './manager/InventoryManager';

import MainMenu from './menu/MainMenu';
import CustomerMenu from './menu/CustomerMenu';
import CarMenu from './menu/CarMenu';
import PartMenu from './menu/PartMenu';
import TransactionMenu from './menu/TransactionMenu';
import UserMenu from './menu/UserMenu';
import AccountMenu from './menu/AccountMenu';
import EmployeeMenu from './menu/EmployeeMenu';
import AdminManager from './manager/AdminManager';

import { Context } from './Store'
import apiClient from './services/api'
import RequestMenu from './menu/RequestMenu';

function Admin() {
  const [state, dispatch] = React.useContext(Context)
  const history = useHistory()

  const config = {
    headers: {
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + state.token
    }
  }

  const doLogout = function() {

    apiClient.post('/api/logout', {}, config)
    .then(response=> {
      document.location.href = '/admin'
    })
    .catch(error => {
      console.log(error.response)
    })
  }
    return (
        <Flex color="white" height="100%">
        <Box className="aside" bg="messenger.600" width="64" padding="1rem">
          <Stack>
            <Box borderBottom="1px solid #ffffff5f" paddingBottom="1rem" padding="1rem">
              <Text fontSize="4xl" fontWeight="bold" letterSpacing=".25rem">NAVI</Text>
              <Text fontWeight="light" fontSize="s" letterSpacing=".35em">AUTOMOBILE</Text>
            </Box>
            <Box flex="1">
              <Stack height="30rem" overflow="auto">

                <Accordion borderColor="transparent">

                { state.user.type >= 10 &&
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Main Menu
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} >
                      <MainMenu />
                    </AccordionPanel>
                  </AccordionItem> }

                  
                  { state.user.type === 1 &&  
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Manage Account
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} >
                      <AccountMenu />
                    </AccordionPanel>
                  </AccordionItem>}

                  { state.user.type === 2 &&  
                    <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Employee
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} >
                      <EmployeeMenu />
                    </AccordionPanel>
                  </AccordionItem>}

                  { state.user.type === 1 &&  
                    <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Customers
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <CustomerMenu />
                      </AccordionPanel>
                  </AccordionItem> }

                  { state.user.type === 1 &&  
                  <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Cars
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <CarMenu />
                      </AccordionPanel>
                  </AccordionItem> }

                  { state.user.type === 1 &&  
                  <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Transaction
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <RequestMenu />
                      </AccordionPanel>
                  </AccordionItem> }
                  
                  { state.user.type === 3 &&  
                    <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Sparepart
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <PartMenu />
                      </AccordionPanel>
                  </AccordionItem> }
                
                { state.user.type === 2 &&  
                  <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Transactions
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <TransactionMenu />
                      </AccordionPanel>
                  </AccordionItem> }

                </Accordion>

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
                      { state.user.name }
                    </MenuButton>

                    <MenuList textColor="gray.700">


                      { state.user.type <= 3 &&
                      <>
                        <MenuItem
                        onClick={
                          function(){
                            history.push('/preferences')
                          }
                        }
                        icon={<i className="la la-sliders-h"></i>}>Preferences</MenuItem>
                        <MenuItem icon={<i className="la la-sign-out-alt"></i>}
                        onClick={doLogout}
                        >Logout</MenuItem> </>}

                      { state.user.type === 4 &&
                        <MenuItem onClick={function(){
                          document.location.reload()
                        }} icon={<i className="la la-sign-in-alt"></i>}>Login</MenuItem>
                      }
                    </MenuList>

                  </Menu>
                </Box>
              </Flex>
            </Box>
            <Box flex="1" bg="#fcfcfc" padding="1rem .5rem" overflowY="auto">

            <Route path='/admin/preferences'>
              <Preferences />
            </Route>

            <Route path='/admin/register'>
              <Register />
            </Route>

            <Route path='/admin/admins'>
              <AdminManager />
            </Route>

            <Route path='/admin/brands'>
              <BrandManager />
            </Route>

            <Route path='/admin/cartypes'>
              <CarTypeManager />
            </Route>

            <Route path='/admin/cars'>
              <CarManager />
            </Route>

            <Route path='/admin/carmodels'>
              <CarModelManager />
            </Route>

            <Route path='/admin/caroptions'>
              <CarOptionManager />
            </Route>

            <Route path='/admin/dealers'>
              <DealerManager />
            </Route>

            <Route path='/admin/employeetypes'>
              <EmployeeTypeManager />
            </Route>

            <Route path='/admin/employees'>
              <EmployeeManager />
            </Route>

            <Route path='/admin/customers'>
              <CustomerManager />
            </Route>

            <Route path='/admin/suppliers'>
              <SupplierManager />
            </Route>

            <Route path='/admin/manufacturers'>
              <ManufacturerManager />
            </Route>

            <Route path='/admin/parts'>
              <PartManager />
            </Route>

            <Route path='/admin/transactiontypes'>
              <TransactionTypeManager />
            </Route>

            <Route path='/admin/transactionstatuses'>
              <TransactionStatusManager />
            </Route>

            <Route path='/admin/transactions'>
              <TransactionManager />
            </Route>

            <Route path='/admin/reports'>
              <Report />
            </Route>

            <Route path='/admin/requests'>
              <TransactionRequestManager />
            </Route>

            <Route path='/admin/inventories'>
              <InventoryManager />
            </Route>

            </Box>
          </Flex>
        </Box>
      </Flex>
    )
}

export default Admin

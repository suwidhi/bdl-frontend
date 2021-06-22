import React from 'react'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

import { useHistory } from 'react-router-dom'
import { Context } from '../Store'

export default function Main() {
  const history = useHistory()

  const { isOpen, onToggle } = useDisclosure();
  const [state, dispatch] = React.useContext(Context)

  return (
    <Box>
      <Flex
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor="gray.100"
        align={'center'}
        shadow="sm"
        >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontSize="lg"
            fontWeigh="bold"
            color="blue.400"
            >
            NAVI
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav history={history} />
          </Flex>
        </Flex>
        
        <Stack
          flex="1"
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          { state.token == '' &&
          <>
          <Button
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            onClick={() => {
              history.push('/store/login')
            }}
            >
            Sign In
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'blue.300',
            }}
            onClick={() => {
              history.push('/store/register')
            }}
            >
            Sign Up
          </Button> 
          </>}

          { state.token != '' &&
          <>
          <Text fontWeight="bold" lineHeight="3rem">{ state.user.name }</Text>
          <Button
            fontSize={'sm'}
            fontWeight={400}
            onClick={(event) => {
              event.preventDefault()
              history.push('/store/transactions')
            }}    
            colorScheme="blue"
            >
            Transaction
          </Button>
            <Button
            fontSize={'sm'}
            fontWeight={400}
            onClick={() => {
              document.location.href = '/store/login'
            }}
            >
            LogOut
          </Button>
          </>}
        </Stack> 
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav history={history}/>
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ history }) => {
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                _hover={{
                  textDecoration: 'none',
                }}
                onClick={(event) => {
                  event.preventDefault()
                  history.push(navItem.href)
                }}
                >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} history={history} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, history }: NavItem) => {
  return (
    <Link
      href={href}
      onClick={(event) => {
        event.preventDefault()
        history.push(href)
      }}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ history }) => {
  return (
    <Stack
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} history={history} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, history }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        onClick={(event) => {
          event.preventDefault()
          history.push(href)
        }}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href} onClick={(event) => {
                event.preventDefault()
                history.push(href)
              }}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/store',
  },
  {
    label: 'Explore',
    children: [
      {
        label: 'Explore Cars',
        subLabel: 'Find your dreams cars now',
        href: '/store/cars',
      },
      {
        label: 'Dealer\'s Location',
        subLabel: 'Location of our offline dealer store',
        href: '/store/dealers',
      },
    ],
  },
];

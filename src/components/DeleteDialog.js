import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
  } from '@chakra-ui/react';

function DeleteDialog({ item, callback }) {
    
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()

    return (
        <>
            <Button onClick={() => setIsOpen(true)} size="xs" leftIcon={<i className="la la-trash"></i>}>
                Delete
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize="md" fontWeight="bold">
                 Delete Employee Data
                </AlertDialogHeader>

                <AlertDialogBody fontSize="md">
                    Are you sure to delete {item.name}?
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} size="sm"  leftIcon={<i className="la la-times"></i>} >
                    Cancel
                </Button>
                <Button colorScheme="red" onClick={() => {
                    callback(item[Object.keys(item)[0]])
                    setIsOpen(false)
                }} ml={3} size="sm" leftIcon={<i className="la la-trash"></i>}>
                    Delete
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
    )
}

export default DeleteDialog

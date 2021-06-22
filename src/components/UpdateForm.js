import React from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
  } from '@chakra-ui/react';

function UpdateForm({ form, callback, isOpen, doClose, onClose, doOpen }) {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="sm">Change Data</ModalHeader>
                <form method="POST" onSubmit={callback}>
                <ModalBody>
                    {form}
                </ModalBody>

                <ModalFooter>
                <Button mr={3} onClick={doClose} size="sm" variant="solid" fontWeight="normal" leftIcon={<i className="la la-times"></i>}>
                    Close
                </Button>
                <Button type="submit" loadingText="Saving" size="sm" colorScheme="blue" leftIcon={<i className="la la-save"></i>} fontWeight="normal">Save</Button>
                </ModalFooter>
                </form>
            </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateForm

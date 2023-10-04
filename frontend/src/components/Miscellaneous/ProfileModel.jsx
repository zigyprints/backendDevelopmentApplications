import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { ViewIcon } from "@chakra-ui/icons"

const ProfileModel = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        {children ? 
        (<span onClick={onOpen}>
            {children}
        </span>):
        (
            <IconButton
                display={{base:"flex"}}
                icon={<ViewIcon/>}
                onClick={onOpen}
            />
        )}
        <Modal size="md" blockScrollOnMount={false} isOpen={isOpen}
         onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
        h="410px">
          <ModalHeader
            fontSize="40px"
            display="flex"
            justifyContent="center" p="0">{user==null?"":user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between">
            <Image 
                borderRadius="full"
                h="200px"
                w="150px"
                src={user==null?"":user.pic}
                alt={user==null?"":user.name}
            />
            <Text
                fontSize={{base:"22px",md:"25px"}}    
            >
            Email: {user==null?"":user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModel

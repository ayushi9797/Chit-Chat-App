import { ViewIcon } from '@chakra-ui/icons';
import {IconButton, useDisclosure,Button, Modal} from '@chakra-ui/react'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
    ModalCloseButton,
    Image,
  Text
} from '@chakra-ui/react'
import React from 'react';

const ProfileModal = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {
                children ? <span onClick={onOpen}>{children}</span>
                    : (<IconButton
                        display={{ base: "flex" }}
                        icon={<ViewIcon />}
                        onClick={onOpen}
                    >
                    
                    </IconButton>)
            }
            <Modal size={"lg"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
            <ModalContent height={'410px'}>
                    <ModalHeader
                        fontSize={"40px"}
                        fontFamily={"Work sans"}
                        display={"flex"}
                        justifyContent={"center"}
                    >{user.name}
                    </ModalHeader>
                <ModalCloseButton />
                    <ModalBody
                        display={"flex"}
                        flexDir={"column"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Image
                            borderRadius={"full"}
                            boxSize={"150px"}
                            src={user.pic}
                            alt={user.name}
                        />
                        <Text>Eamil:{ user.email}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    );
    
};
export default ProfileModal
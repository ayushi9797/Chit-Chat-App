import { Avatar, Box, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { BellIcon,ChevronDownIcon } from '@chakra-ui/icons'
import React from 'react'
import{useState} from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import {Drawer, DrawerBody, DrawerContent, DrawerHeader,DrawerOverlay,} from "@chakra-ui/modal";
import axios from 'axios';
import { getSender } from '../../config/ChatLogics';
// import { ChatState } from "../../Context/ChatProvider";
const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState()
    const {  setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats, } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast=useToast()
// logout
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
            window.location.href="/"
    }
    // search
    const handleSearch = async() => {
        if (!search) {
            toast({
                title: "Please enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position:"top-left"
            })
            return;
        }
        try {
                  setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured",
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom-left"
            })
        }
    }

    // get and create chat

    const accessChat = async(userId) => {
         console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    }
    return( <>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px"
        >
            <Tooltip label="Search Users to Chat" hasArrow placement='bottom-end'>
                <Button variant="ghost" onClick={onOpen}>
                    <i class="fas fa-search"></i>
                    <Text display={{base:"none",md:"flex"}}p="4px">Search User</Text>
                </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="work sans">
                Chit-Chat-App
            </Text>
            {/*  */}
            <div>
                <Menu>
                    <MenuButton padding={1}>
                        <BellIcon fontSize="2xl" margin={1}/>
                    </MenuButton>
                    <MenuList pl={2}>
                        {!notification.length && "No new Messages"}
                        {notification.map(notifi => {
                            <MenuItem key={notifi._id} onClick={
                                ()=>{
                                setSelectedChat(notifi.chat);
                            setNotification(notification.filter((n) => n !== notifi))
                        }}>
                                {notifi.chat.isGroupChat
                                    ? `New Message in ${notifi.chat.chatName}`
                            :`New Message from ${getSender(user,notifi.chat.user)}`}
                            </MenuItem>
                        })}
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar size={'sm'} cursor={'pointer'} name={user.name} src={ user.pic } />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider></MenuDivider>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        
                    </MenuList>
                </Menu>
            </div>
        </Box>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader
                borderBottomWidth={"1px"}>
                    Search Users
                </DrawerHeader>
                <DrawerBody >
                    <Box display={'flex'} pb={2}>
                        <Input
                        placeholder='Search by name or email'
                        mr={2}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}></Input>
                    <Button onClick={handleSearch}>Go</Button>
                    </Box>
                    {loading ? (
                        <ChatLoading/>
                    ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                handleFunction={()=>accessChat(user._id)}
                                />
                            ))
                    )}
                    {loadingChat && <Spinner ml="auto" display={'flex'}></Spinner>}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
    );
}


export default SideDrawer
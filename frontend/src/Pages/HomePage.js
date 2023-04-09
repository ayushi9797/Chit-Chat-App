import React, { useEffect } from 'react'
import { Box, Container, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../Components/Authentication/Login';
import SignUp from '../Components/Authentication/SignUp';
import { redirect } from 'react-router-dom';

const HomePage = () => {
    // const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) {
            redirect('/chats')
        }
    }, []);

    return <Container maxW="xl" centerContent>
        <Box
            d='flex'
            justifyContent="center"
            p={3}
            bg={'white'}
            w='100%'
            m='40px 0 15px 0'
            borderRadius='1g'
            borderW='1px'

        >
            {/* <img src='./images/chat logo design.png' alt="Chit-Chat Logo" /> */}
            <Text fontSize='4xl' fontFamily="Work sans" color="black" textAlign={'center'} >Chit-Chat-App</Text>
        </Box>
        <Box bg='white' w='100%' p={4} borderRadius="1g" borderWidth="1px">
            <Tabs variant='soft-rounded' >

                <TabList mb='1em'>
                    <Tab width="50%">Login</Tab>
                    <Tab width="50%">Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel><Login /></TabPanel>
                    <TabPanel><SignUp /></TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Container>
};

export default HomePage
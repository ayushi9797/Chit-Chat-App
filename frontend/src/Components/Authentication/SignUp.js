import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmedpassword, setConfirmassaword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
     const navigate = useNavigate();
    // handleCkick show and hide the password
    const handleCkick = () => setShow(!show)
    // https://api.cloudinary.com/v1_1/dvq5ovjvg
    // add image postdetails
    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please select an image",
                status: "warning",
                duraton: 5000,
                isClosable: true,
                position: "button"
            });
            return;
        }
        console.log(pics)
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("Cloud_name", "dvq5ovjvg");
                fetch("https://api.cloudinary.com/v1_1/dvq5ovjvg/image/upload", {
                    method: "POST",
                    body: data
                }).then((res) => res.json())
                    .then((data) => {
                        setPic(data.url.toString());
                        console.log(data.url.toString())
                        setLoading(false)
                    })
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
            })
        } else {
            toast({
                title: "Please select an image",
                status: "warning",
                duraton: 5000,
                isClosable: true,
                position: "button"
            });
            return;
        }
    };

    // submit the form
    const submitHandler = async() => {
        setLoading(true);
        if (!name || !email || !password || !confirmedpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
        }
        // check password
        if (password !== confirmedpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        // add to Db
        console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user", {
                name,
                email,
                password,
                pic
            },
                config
            );
            console.log(data);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            //  history.push("/chats");
                window.location.href="/"

        }
        catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
    }
    }

    return <VStack spacing='5px' color='black'>
        {/* name */}
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)}></Input>
        </FormControl>

        {/* email */}
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your email eg.dilipinbsanap@gmail.com' onChange={(e) => setEmail(e.target.value)}></Input>
        </FormControl>

        {/* password */}
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            {/* enter the password */}
            <InputGroup>
                <Input
                    // if sho then show the text else show the password format
                    type={show ? "text" : "password"}
                    placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)}></Input>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleCkick}>
                        {/* toggle the sow and hide */}
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        {/* conform the password */}
        <FormControl id='password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            {/* enter the password */}
            <InputGroup>
                <Input
                    // if sho then show the text else show the password format
                    type={show ? "text" : "password"}
                    placeholder='Confirm the password' onChange={(e) => setConfirmassaword(e.target.value)}></Input>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleCkick}>
                        {/* toggle the sow and hide */}
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    
        {/* Add the picture */}
        <FormControl id='pic'>
            <FormLabel>Upload your Picture </FormLabel>
            <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
            ></Input>
        </FormControl>

        {/* sign up button */}
        <Button
            colorScheme="blue"
            width={'100%'}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
        >
            Sign Up
        </Button>
    
    </VStack>
}

export default SignUp
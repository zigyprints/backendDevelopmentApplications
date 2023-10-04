import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Toast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom";
const Login = () => {
    const [show,setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleClick=()=>{
        setShow(!show);
    }
    const [loading,setLoading] = useState(false);
    const submitHandler=async ()=>{
        setLoading(true);
        if(!email || !password){
            Toast({
                title:"Please fill all the Fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            })
            setLoading(false);
            return;
        }
        try{
            const config={
                headers:{
                    'Content-type':"application/json",
                },
            };
            const { data } = await axios.post("/api/user/login",
            {email,password},config);
            Toast({
                title:"Registration Successful",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom",
            }); 
            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            navigate('/chats')
        }
        catch(err){
            console.log(err);
            Toast({
                title:"Error Occured",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            }); 
            setLoading(false);
            return;
        }
    }
  return (
    <VStack spacing="5px">
        <FormControl id='email' isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input 
                placeholder='Enter Your Email' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                bg="white">
            </Input>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
                <Input 
                    type={show?"text":"password"}
                    placeholder='Enter Your Password' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    bg="white">
                </Input>
                <InputRightElement width="5rem">
                    <Button h="1.75rem" siz="sm" onClick={handleClick}>
                        {show ? "Hide":"Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button
            colorScheme="blackAlpha"
            width="100%"
            style={{marginTop: 15}}
            onClick={submitHandler}
            color="black"
            isLoading={loading}
        >
        Login
        </Button>
        <Button
            colorScheme="gray"
            width="100%"
            style={{marginTop: 15}}
            onClick={()=>{
                setEmail("guest@example.com");
                setPassword("123456");
            }}
            color="black"
        >
        Get Guest User Credentials
        </Button>
    </VStack>
  )
}

export default Login

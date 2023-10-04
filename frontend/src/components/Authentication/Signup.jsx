import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
const Signup = () => {
    const [show,setShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState("");
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const handleClick=()=>{
        setShow(!show);
    }
    const handleClick1=()=>{
        setConfirmShow(!confirmShow);
    }
    const postDetails=(pics)=>{
        setLoading(true);
        if(pics===undefined){
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom'
              })
              return;
        }
        if(pics.type==="image/jpeg" || pics.type==="image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-app");
            data.append("cloud_name","dnzwzwnlg");
            fetch("https://api.cloudinary.com/v1_1/dnzwzwnlg/image/upload",{
                method:"post",
                body:data,
            }).then((res)=>res.json())
            .then(data=>{
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
            })
        }else{
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom'
              })
              return;
        }
    }
    const submitHandler=async ()=>{
        setLoading(true);
        if(!name || !email || !password || !confirmPassword){
            toast({
                title:"Please fill all the Fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            })
            setLoading(false);
            return;
        }
        if( password !== confirmPassword)
        {
            toast({
                title:"The passwords need to match",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            setLoading(false);
            return;
        }

        try{
            const { data } = await axios.post("http://localhost:5000/api/user",
            {name,email,password,pic});
            toast({
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
            toast({
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
        <FormControl id='first-name' isRequired>
            <FormLabel>
                Name
            </FormLabel>
            <Input 
                placeholder='Enter Your Name' 
                onChange={(e)=>setName(e.target.value)}
                bg="white">
            </Input>
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input 
                placeholder='Enter Your Email' 
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
        <FormControl id='confirm-password' isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
                <Input 
                    type={confirmShow?"text":"password"}
                    placeholder='Enter Your Password' 
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    bg="white">
                </Input>
                <InputRightElement width="5rem">
                    <Button h="1.75rem" siz="sm" onClick={handleClick1}>
                        {confirmShow ? "Hide":"Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl>
            <FormLabel>
                Upload your Picture
            </FormLabel>
            <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e)=>postDetails(e.target.files[0])}
            >
            </Input>
        </FormControl>
        <Button
            colorScheme="blackAlpha"
            width="100%"
            style={{marginTop: 15}}
            onClick={submitHandler}
            color="black"
            isLoading={loading}
        >
        SignUp
        </Button>
    </VStack>
  )
}

export default Signup

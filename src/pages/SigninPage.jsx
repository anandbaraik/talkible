import React, {useState, useEffect} from 'react'
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import {Flex,Box,FormControl,FormLabel,Input,InputGroup,InputRightElement,Stack,Button,Heading,Text,useColorModeValue,Link as ChakraLink} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TOAST_CONFIG } from "../util/constants";
import { toast } from "react-toastify";
import axios from "axios";

const SigninPage = () => {

  const [showPassword, setShowPassword] = useState(false);

  const {token, setUser, setToken} = useAuth();
    const [signInCredential, setSignInCredential] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
          navigate("/");
        }
    }, [token, navigate]);

  const signinHandler = async(e) => {
	e.preventDefault();
    try {
        const {data:{encodedToken, foundUser}} = await axios.post(`/api/auth/login`, signInCredential);

        //store token & user in the local storage
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("user", JSON.stringify(foundUser));

        setToken(encodedToken);
        setUser(foundUser);

        toast.success(`Welcome back, ${foundUser?.firstName}!`, TOAST_CONFIG);

    } catch (error) {
        toast.error(`User ${error.response.statusText}`, TOAST_CONFIG);
    }

    setSignInCredential({
        username: "",
        password: "",
    });
  }
  const setTestCredential = () => {
    setSignInCredential({
        username: "anandbaraik",
        password: "anand1234"
    });
  }

  return (
    <Flex
      minH={'100vh'}
      width='full'
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
        <Box
            width="90vw"
            maxWidth="500px"
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
            <Flex justifyContent="center" position="relative">
                <Heading>Sign In</Heading>
                <ColorModeSwitcher position="absolute" right="0" />
            </Flex>
            <form onSubmit={signinHandler}>
                <Stack my={8} spacing={4}>
                    <FormControl id="username" isRequired>
                        <FormLabel>User name</FormLabel>
                        <Input type="text"
                            value={signInCredential.username}
                            onChange={(e) => setSignInCredential((prev) => ({...prev, username:e.target.value}))}/>
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'}
                                value={signInCredential.password}
                                onChange={(e) => setSignInCredential((prev) => ({...prev, password:e.target.value}))}/>
                            <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                                }>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack spacing={5} pt={2}>
                        <Button
                            type='submit'
                            size="lg"
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}>
                            Sign In
                        </Button>
                        <Button
                            onClick={setTestCredential}
                            variant='outline'
                            type='button'
                            size="lg"
                            color={useColorModeValue('gray.700', 'white')}
                            _hover={{
                                bg: 'blue.500',
                                color: 'white'
                            }}>
                            Set guest credentials
                        </Button>
                    </Stack>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            Don't have an account? {' '}
                            <ChakraLink
                                as={Link}
                                to="/signup"
                                _hover={{
                                    textDecoration: 'none',
                                }}
                                color={'blue.400'}
                            >
                                Sign up
                            </ChakraLink>
                        </Text>
                    </Stack>
                </Stack>
            </form>
        </Box>
    </Flex>
  )
}

export default SigninPage
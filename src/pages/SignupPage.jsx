import React,{useEffect, useState} from 'react'
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import {Flex,Box,FormControl,Input,InputGroup,HStack,InputRightElement,Stack,Button,Link as ChakraLink,Heading,Text,useColorModeValue} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';
import { TOAST_CONFIG } from "../util/constants";
import { toast } from "react-toastify";
import axios from "axios";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  	const navigate = useNavigate();
    const {token, setUser, setToken} = useAuth();

	useEffect(() => {
        if (token) {
          navigate("/");
        }
    }, [token, navigate]);

	const signupHandler = async(e) => {
		e.preventDefault();

		if(userDetails.confirmPassword !== userDetails.password) {
			toast.error('Passwords do not match', TOAST_CONFIG);
			return
		}

		try {
            const {data:{encodedToken, createdUser}} = await axios.post(`/api/auth/signup`, userDetails);

            //store token & user in the local storage
            localStorage.setItem("token", encodedToken);
            localStorage.setItem("user", JSON.stringify(createdUser));

            setToken(encodedToken);
            setUser(createdUser);

            toast.success(`Account created successfully,
			Welcome ${createdUser?.firstName}!`, TOAST_CONFIG);

        } catch (error) {
			const {response:{data:{errors}}} = error;
			toast.error(errors[0], TOAST_CONFIG);
        }

		setUserDetails({
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		});
	}
  return (
    <Flex
		minHeight="100dvh"
		width="full"
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
				<Heading>Sign Up</Heading>
				<ColorModeSwitcher position="absolute" right="0" />
			</Flex>
			<form onSubmit={signupHandler}>
				<Stack my={8} spacing={4}>
					<HStack>
						<Box>
							<FormControl id="firstName" isRequired>
								<Input
									type="text"
									placeholder="Enter first name"
									value={userDetails.firstName}
									onChange={e => setUserDetails((prev) => ({...prev, firstName:e.target.value}))}/>
							</FormControl>
						</Box>
						<Box>
							<FormControl id="lastName" isRequired>
								<Input
									type="text"
									placeholder="Enter last name"
									value={userDetails.lastName}
									onChange={e => setUserDetails((prev) => ({...prev, lastName:e.target.value}))}
								/>
							</FormControl>
						</Box>
					</HStack>
					<FormControl id="email" isRequired>
						<Input type="email"
							placeholder="Enter email id"
							value={userDetails.email}
							onChange={e => setUserDetails((prev) => ({...prev, email:e.target.value}))}/>
					</FormControl>
					<FormControl id="username" isRequired>
						<Input type="text"
							placeholder="Enter username"
							value={userDetails.username}
							onChange={e => setUserDetails((prev) => ({...prev, username:e.target.value}))}/>
					</FormControl>
					<FormControl id="password" isRequired>
						<InputGroup>
							<Input
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter password"
								value={userDetails.password}
								onChange={e => setUserDetails((prev) => ({...prev, password:e.target.value}))}/>
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
					<FormControl id="cnfPassword" isRequired>
						<InputGroup>
							<Input
								type={showCnfPassword ? 'text' : 'password'}
								placeholder="Confirm password"
								value={userDetails.confirmPassword}
								onChange={e => setUserDetails((prev) => ({...prev, confirmPassword:e.target.value}))}/>
							<InputRightElement h={'full'}>
							<Button
								variant={'ghost'}
								onClick={() =>
								setShowCnfPassword((showCnfPassword) => !showCnfPassword)
								}>
								{showCnfPassword ? <ViewIcon /> : <ViewOffIcon />}
							</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					<Stack spacing={10} pt={2}>
						<Button
							isDisabled={userDetails.password !== userDetails.confirmPassword}
							type='submit'
							loadingText="Submitting"
							size="lg"
							bg={'blue.400'}
							color={'white'}
							_hover={{
							bg: 'blue.500',
							}}>
							Sign up
						</Button>
					</Stack>
					<Stack pt={6}>
						<Text align={'center'}>
							Already have an account? {' '}
							<ChakraLink
								as={Link}
								to="/signin"
								_hover={{
									textDecoration: 'none',
								}}
								color={'blue.400'}
							>
								Sign In
							</ChakraLink>
						</Text>
					</Stack>
				</Stack>
			</form>
		</Box>
    </Flex>
  )
}

export default SignupPage
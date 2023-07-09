import { Avatar, Flex, Text, Button, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { followUserService } from '../services/userService';
import {useAuth} from "../context/AuthContext";
import { useUser } from '../context/UserContext';

const UserList = ({ user, isSearchUser }) => {

	const {token, setUser} = useAuth();
	const {isBtnDisabled, setIsBtnDisabled, userDispatch} = useUser();
	const followHandler = (user) => {
		followUserService(userDispatch, setUser, setIsBtnDisabled, user, token);
	}

  return (
    <Flex key={user._id} align="center" pb="1" mb="2" borderBottomWidth={{ base: '1px', lg: '1px' }}
    borderColor={useColorModeValue('gray.500', 'gray.500')}>
      <Link to={`/profile/${user.username}`}>
        <Avatar
          mr="2"
          src={user.profileAvatar}
          name={`${user.firstName} ${user.lastName}`}
        />
      </Link>
      <Flex flexDir="column" flexGrow={isSearchUser ? 1 : 0}>
        <Link to={`/profile/${user.username}`}>
          <Text size="lg" fontWeight={700}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
          <Text fontSize="sm">@{user.username}</Text>
        </Link>
      </Flex>

      {!isSearchUser && (
        <Button ml="auto" colorScheme="blue"
			isDisabled={isBtnDisabled}
			size="sm"
			onClick={() => followHandler(user)}>
          Follow
        </Button>
      )}
    </Flex>
  );
};

export default UserList;
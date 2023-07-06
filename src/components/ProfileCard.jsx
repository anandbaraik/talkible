import {Avatar,Button,Divider,Flex,HStack,Heading,IconButton,Link,Text,useDisclosure} from '@chakra-ui/react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { logoutUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { followUserService, unFollowUserService } from '../services/userService';
import ViewFollowers from './ViewFollowers';
import EditProfile from './EditProfile';
const ProfileCard = ({ user, totalPosts }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  	const {user:authUser, setToken, token, setUser} = useAuth();
  	const [loader, setLoader] = useState(false);
  	const {isBtnDisabled, setIsBtnDisabled, userDispatch} = useUser();
  	const isAuthUser = authUser?.username === user?.username;

    const isUserFollowed = authUser?.following?.some(({ username }) => {
      return username === user?.username;
    });

  const followHandler = () => {
    if (isUserFollowed) {
		unFollowUserService(userDispatch, setUser, setIsBtnDisabled, user, token);
    } else {
		followUserService(userDispatch, setUser, setIsBtnDisabled, user, token);
    }
  };

    return (
      <Flex mt={{ base: 0, lg: 4 }} p={2} w="full" maxW="600px">
        <Flex w="full" flexDir="column" gap={4}>
          <Flex gap={2} w="full">
            <Avatar
              src={user?.profileAvatar}
              name={`${user?.firstName} ${user?.lastName}`}
              size="xl"
            />
            <Flex flexGrow={1}>
              <Flex justifyContent="space-between" w="full">
                <Flex flexDir="column" justifyContent="center">
                  <Heading size="md">{`${user?.firstName} ${user?.lastName}`}</Heading>
                  <Text>{`@${user?.username}`}</Text>
                </Flex>
                {isAuthUser ? (
                  <HStack>
                    <Button
                      display={{ base: 'none', lg: 'block' }}
                      onClick={onOpen}
                    >
                      Edit Profile
                    </Button>
                    <IconButton
                      display={{ base: 'block', lg: 'none' }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      onClick={onOpen}
                    />
                    <IconButton
                      variant='outline'
                      color={'red.400'}
                      disabled={loader}
                      icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                      onClick={() => { logoutUser(setToken, setUser, setLoader) }}
                    />
					<EditProfile isOpen={isOpen}
						onClose={onClose}
						user={authUser}/>
                  </HStack>
                ) : (
                  <HStack>
                    <Button
					disabled={isBtnDisabled}
                      onClick={() => followHandler()}
                      colorScheme={isUserFollowed ? 'red' : 'blue'}
                    >
                      {isUserFollowed ? 'Unfollow' : 'Follow'}
                    </Button>
                  </HStack>
                )}
              </Flex>
            </Flex>
          </Flex>
          <Flex>{user?.bio}</Flex>
          {
            user?.website && (
              <Flex alignItems={'center'} gap="1">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
                <Link href={user?.website} target="_blank">
                    {user?.website}
                </Link>
              </Flex>
            )
          }
          <Divider />
          <Flex gap={5}>
          <Flex gap={1}>
            <strong pr>{totalPosts}</strong> {'Posts'}
          </Flex>
            <Flex cursor={'pointer'}>
				<ViewFollowers type={'following'} users={user?.following}/>
			</Flex>
			<Flex cursor={'pointer'}>
				<ViewFollowers type={'followers'} users={user?.followers}/>
			</Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  export default ProfileCard;
import {Flex, Text, useColorModeValue, Spinner, Heading } from '@chakra-ui/react';
import UserList from './UserList';
import { useUser } from '../context/UserContext';
import { getUserSuggestions } from '../util/commonFunction';
import { useAuth } from "../context/AuthContext";
const RightSidebar = () => {

  const {users:allUsers, isLoading} = useUser();
  const {user:authUser} = useAuth();
  const userSuggestionList = getUserSuggestions(allUsers, authUser);
  const colorModeValue = useColorModeValue('#cbd5e0', '#90CDF4');

  return (
    <Flex
      borderLeft="1px"
      display={{ base: 'none', lg: 'flex' }}
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      h="full"
      w="20rem"
      flexDir="column"
      gap={4}
      fontSize="1.2rem"
      p={2}
      pr={4}
    >
        <Text fontSize="xl" fontWeight="bold" mb="4" ml="4">
            Suggested for you
        </Text>
        {
          isLoading ? (
          <Flex justifyContent="center" mt={5}>
            <Spinner colorScheme="blue" size="xl" />
          </Flex>
        ) : (
            <Flex
              flexDir="column"
              gap="4"
              maxH="80vh"
              overflowY="scroll"
              p="2"
              css={{
                '&::-webkit-scrollbar': {
                  width: '2px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: colorModeValue,
                  borderRadius: '2px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                }
              }}
            >
            {
              (userSuggestionList?.length > 0) ? (
                userSuggestionList?.map((user, i) => (
                  <UserList key={i} user={user} />
                ))
              ) : (
              <Flex flexDir="column" alignItems="center" gap={4}>
                <Heading as={'h6'} size={'xs'} textAlign="center" mt={10}>
                  No suggestions found.
                </Heading>
              </Flex>
              )
            }
            </Flex>
          )
        }
    </Flex>
  );
};

export default RightSidebar;
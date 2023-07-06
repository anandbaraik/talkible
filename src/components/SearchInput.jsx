import {Flex,IconButton,Input,InputGroup,InputRightElement,Popover,PopoverArrow,PopoverBody,PopoverContent,PopoverTrigger,Text,useColorModeValue,useDisclosure} from '@chakra-ui/react';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import UserList from '../components/UserList';
import { useRef } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { useUser } from '../context/UserContext';
import { getSearchSuggestions } from '../util/commonFunction';
import { useAuth } from '../context/AuthContext';
const SearchInput = () => {

    const {users:allUsers} = useUser();
    const {user:authUser} = useAuth();
    const [searchText, setSearchText] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialFocusRef = useRef(null);

    const allUsersExceptCurrentUser = allUsers?.filter((user) => (user?.username !== authUser?.username));

    const searchSuggestionList = getSearchSuggestions(allUsersExceptCurrentUser, searchText);

    const colorModeValue = useColorModeValue('#cbd5e0', '#90CDF4');

    return (
      <Popover
        placement="bottom"
        initialFocusRef={initialFocusRef}
        isOpen={isOpen && searchText.trim().length > 0}
      >
        <PopoverTrigger>
          <Flex alignItems="center" flexBasis="20rem">
            <InputGroup>
              <Input
                ref={initialFocusRef}
                type="text"
                placeholder="Search users"
                size="md"
                borderRadius="full"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onBlur={onClose}
                onFocus={onOpen}
              />
              <InputRightElement
                pointerEvents={searchText.trim().length > 0 ? 'auto' : 'none'}
              >
                {searchText.trim().length > 0 ? (
                  <IconButton
                    icon={<CloseIcon />}
                    borderRadius="full"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchText('')}
                  />
                ) : (
                  <FiSearch />
                )}
              </InputRightElement>
            </InputGroup>
          </Flex>
        </PopoverTrigger>
        <PopoverContent maxW={{ base: '15rem', lg: '20rem' }}>
          <PopoverArrow />
          <PopoverBody>
            <Flex
              flexDir="column"
              gap="4"
              maxH="16rem"
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
                },
              }}
            >
              {
                searchSuggestionList?.map(user => (
                  <UserList key={user?.username} user={user} isSearchUser />
                ))
              }
              {
                (searchText.trim().length > 0) && (searchSuggestionList.length === 0) && (
                    <Text>
                        No results for {`"${searchText}"`}
                    </Text>
                )
            }
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  export default SearchInput;
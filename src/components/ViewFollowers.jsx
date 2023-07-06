import {Flex,Popover,PopoverArrow,PopoverBody,PopoverContent,PopoverTrigger,Text,useDisclosure} from '@chakra-ui/react';
  import UserList from './UserList';
  const ViewFollowers = ({ type, users }) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    return (
      <Popover isLazy
        initialFocusRef={null}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}>
        <PopoverTrigger>
          <Text
            >
            <strong>
                {users?.length} {' '}
            </strong>
            {
                (type === 'following') ? (
                    'Following'
                ) : (
                    'Follower(s)'
                )
            }
          </Text>
        </PopoverTrigger>
        <PopoverContent p={0}>
          <PopoverArrow />
          <PopoverBody p={0}>
            <Flex
              flexDir="column"
              alignItems={'center'}
              gap="4"
              maxH="15rem"
              overflowY="auto"
              p="2"
              onClick={onClose}
            >
              {users?.length > 0 ? (
                users.map(user => (
                  <UserList key={user._id} user={user} isSearchUser />
                ))
              ) : (
                <Text textAlign="center" fontSize="1rem">
                    {
                        (type === 'following') ? (
                            `Oops, no following yet.`
                        ) : (
                            `Oops, no followers yet.`
                        )
                    }
                </Text>
              )}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  export default ViewFollowers;
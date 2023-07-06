import {Avatar,Box,Card,CardBody,Flex,useDisclosure,IconButton,Heading,Center} from '@chakra-ui/react';
  import {useAuth} from "../context/AuthContext";
  import NewPostModal from './NewPostModal';
  import { AddIcon } from '@chakra-ui/icons';
  const NewPostCard = () => {
	const {user:authUser} = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Card
	  	cursor={'pointer'}
        w="full"
        maxW="600px"
        mt={4}
        boxShadow="0 0 10px 0 rgba(0,0,0,0.15)"
        display={{ base: 'none', lg: 'block' }}
		onClick={onOpen}
      >
        <CardBody py={4} px={4}>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-around'}>
            <Box w="50px" h="50px">
              <Avatar src={authUser.profileAvatar} alt={`${authUser?.firstName} ${authUser?.lastName}`}/>
            </Box>
            <Box flexGrow={1}>
				<Center>
					<Heading as='h4' size='md'>
            {`What is happening ${authUser?.firstName}?!`}
					</Heading>
				</Center>
            </Box>
			<IconButton
				icon={<AddIcon />}
				borderRadius="full"
				order={{ base: 1, lg: 0 }}
				onClick={onOpen}
				/>
          </Flex>
		  <NewPostModal isOpen={isOpen} onClose={onClose} />
        </CardBody>
      </Card>
    );
  };

  export default NewPostCard;
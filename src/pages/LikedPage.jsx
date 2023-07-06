import React from 'react';
import { Box, Divider, Flex, Heading, Spinner, Button } from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import { usePost } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const LikedPage = () => {

	const {posts, isLoading} = usePost();
	const {user} = useAuth();

  	const likedPosts = posts?.filter((post) =>{
    	return post?.likes?.likedBy.some(({_id}) => _id === user._id)
  	});

  return isLoading ? (
    <Flex justifyContent="center" mt={5} alignItems={'center'} height={'100%'}>
      <Spinner color="blue.300" size="xl" />
    </Flex>
  ) : (
    <>
      <Box h="full" p={2}>
        <Box p={2}>
          <Heading textAlign="center" fontSize={{ base: 'xl', lg: '2xl' }}>
            Liked posts
          </Heading>
        </Box>
        <Divider />
        <Flex flexDir="column" alignItems="center" pb={4} pt={4}>
			{
				(likedPosts?.length > 0) ? (
					likedPosts?.map(post => (
					<PostCard post={post} key={post._id} />
				))
				) : (
				<Flex flexDir="column" alignItems="center" gap={4}>
					<Heading fontSize="1.5rem" textAlign="center" mt={10}>
					You have not liked any post yet!
					</Heading>
					<Button as={Link} to="/explore" colorScheme="blue">
						Explore & like some posts
					</Button>
				</Flex>
				)
			}
        </Flex>
      </Box>
    </>
  );
};

export default LikedPage;
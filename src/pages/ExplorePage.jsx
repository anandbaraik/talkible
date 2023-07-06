import React from 'react';
import { Box, Divider, Flex, Heading, Spinner } from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import { usePost } from '../context/PostContext';
import {useAuth} from "../context/AuthContext"
const ExplorePage = () => {

  const { posts, isLoading } = usePost();
  const { user: authUser } = useAuth();

  const allExplorePosts = posts.filter((post) => {
    return post.username !== authUser.username;
  });

  return isLoading ? (
    <Flex justifyContent="center" mt={5} alignItems={'center'} height={'100%'}>
      <Spinner color='blue.300' size="xl" />
    </Flex>
  ) : (
    <>
      <Box h="full" p={2}>
        <Box p={2}>
          <Heading textAlign="center" fontSize={{ base: 'xl', lg: '2xl' }}>
            Explore
          </Heading>
        </Box>
        <Divider />
        <Flex flexDir="column" alignItems="center" pb={4} pt={4}>
			{
				allExplorePosts?.map(post => (
					<PostCard post={post} key={post._id} />
				))
			}
        </Flex>
      </Box>
    </>
  );
};

export default ExplorePage;
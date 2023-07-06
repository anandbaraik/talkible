import React from 'react';
import { Box, Divider, Flex, Heading, Spinner, Button } from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { usePost } from '../context/PostContext';
const BookmarksPage = () => {

  const {bookmarks, isLoading} = useUser();
  const {posts} = usePost();

  const bookmarkedPosts = posts.filter((post) => {
		return bookmarks.some(({_id}) => _id === post._id);
	});

  return isLoading ? (
    <Flex justifyContent="center" alignItems={'center'} height={'100%'} mt={5}>
      <Spinner color='blue.300' size="xl" />
    </Flex>
  ) : (
    <>
      <Box h="full" p={2}>
        <Box p={2}>
          <Heading textAlign="center" fontSize={{ base: 'xl', lg: '2xl' }}>
            Book marks
          </Heading>
        </Box>
        <Divider />
        <Flex flexDir="column" alignItems="center" pb={4} pt={4}>
          {
            (bookmarkedPosts?.length > 0) ? (
				bookmarkedPosts?.map(post => (
                <PostCard post={post} key={post._id} />
              ))
            ) : (
              <Flex flexDir="column" alignItems="center" gap={4}>
                <Heading fontSize="1.8rem" textAlign="center" mt={10}>
				  You have not bookmarked any post yet!
                </Heading>
                <Button as={Link} to="/explore" colorScheme="blue">
                  Explore & add some posts
                </Button>
              </Flex>
            )
          }
        </Flex>
      </Box>
    </>
  );
};

export default BookmarksPage;
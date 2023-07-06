import {Box,Divider,Flex,Heading,Spinner} from '@chakra-ui/react';
import SortBar from '../components/SortBar';
import NewPostCard from '../components/NewPostCard';
import PostCard from '../components/PostCard';
import { usePost } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import {getPostsBySortingType} from "../util/commonFunction";
const HomePage = () => {

  const {posts, sortBy, isLoading, postDispatch} = usePost();
  const { user: authUser } = useAuth();

  const allPosts = posts?.filter((post) => {
      return (post?.username === authUser?.username) ||  authUser?.following?.some(({ username }) => username === post.username);
  });

  const sortedPosts = getPostsBySortingType(allPosts, sortBy);

  return isLoading ? (
    <Flex alignItems={'center'} justifyContent="center" mt={5} height={'100%'}>
      <Spinner color="blue.300" size="xl" />
    </Flex>
  ) : (
    <>
      <Box h="full" p={2}>
        <Box p={2}>
          <Heading textAlign="center" fontSize={{ base: 'xl', lg: '2xl' }}>
            Home
          </Heading>
        </Box>
        <Divider />
        <Flex flexDir="column" alignItems="center" pb={4}>
          <NewPostCard />
			{sortedPosts.length === 0 ? (
			<Heading textAlign={'center'} fontSize="1.5rem" mt={5}>
				Start following like minded people & sharing your thougts to the world!
			</Heading>
			) : (
			<Box>
				<SortBar sortBy={sortBy} setSortBy={postDispatch} />
				{sortedPosts?.map(post => (
					<PostCard post={post} key={post._id} />
				))}
			</Box>
			)}
        </Flex>
      </Box>
    </>
  );
};

export default HomePage;
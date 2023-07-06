import { Flex, Spinner, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import ProfileCard from '../components/ProfileCard';
import { useUser } from '../context/UserContext';
import { usePost } from '../context/PostContext';
import { getPostsBySortingType } from '../util/commonFunction';
import { useAuth } from '../context/AuthContext';
const ProfilePage = () => {

  const {username} = useParams();
  const {users} = useUser();
  const {user:authUser} = useAuth();
  const {posts, isLoading} = usePost();

  const isAuthUser = authUser?.username == username;

  let user = users?.find((user) => {
    return user?.username === username;
  });

  user = isAuthUser ? authUser : user;

  const userPosts = posts?.filter((post) => {
	  return post?.username === user?.username;
  });

  const userLatestPosts = getPostsBySortingType(userPosts, 'Latest');

  return isLoading ? (
    <Flex justifyContent="center" mt={5} alignItems={'center'} height={'100%'}>
      <Spinner color='blue.300' size="xl" />
    </Flex>
  ) : (
    <Flex p={2} flexDir="column" alignItems="center">
      <ProfileCard user={user} totalPosts={userPosts?.length}/>
		{
			(userLatestPosts?.length > 0) ? (
				userLatestPosts?.map(post => (
				<PostCard post={post} key={post._id} />
			))
			) : (
			<Flex flexDir="column" alignItems="center" gap={4}>
				<Heading fontSize="1.5rem" textAlign="center" mt={10}>
					No posts to show.
				</Heading>
			</Flex>
			)
		}
    </Flex>
  );
};

export default ProfilePage;
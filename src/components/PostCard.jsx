import {Avatar,Box,Card,CardBody,CardFooter,Divider,Flex,Heading,IconButton,Image,Menu,MenuButton,MenuItem,MenuList,Text,useDisclosure} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import {faHeart as faHeartSolid,faBookmark as faBookmarkSolid,faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import NewPostModal from './NewPostModal';
import {useUser} from "../context/UserContext";
import { useAuth } from '../context/AuthContext';
import { addPostToBookmarkService, removePostFromBookmarkService } from '../services/userService';
import { likePostService, unlikePostService, deletePostService } from '../services/postService';
import { usePost } from '../context/PostContext';
import { useState } from 'react';
import { getHumanizeTimePost } from '../util/commonFunction';
  const PostCard = ({ post }) => {

    const { users, bookmarks, userDispatch } = useUser();
    const { user: authUser, token } = useAuth();
    const {postDispatch} = usePost();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const user = users.find(user => user?.username === post?.username);

    const isPostCreator = authUser?.username === user?.username;

    const isBookmarked = bookmarks?.some(({_id}) => _id === post._id);

    const isLiked = post?.likes?.likedBy?.some(({_id}) => _id === authUser._id);


    const bookmarkHandler = () => {
      if (isBookmarked) {
          removePostFromBookmarkService(userDispatch, setIsBtnDisabled, token, post._id);
      } else {
          addPostToBookmarkService(userDispatch, setIsBtnDisabled, token, post._id);
      }
    };

    const likeHandler = () => {
      if (isLiked) {
        unlikePostService(postDispatch, setIsBtnDisabled, token, post._id);
      } else {
        likePostService(postDispatch, setIsBtnDisabled, token, post._id);
      }
    };

    const deleteHandler = () => {
      deletePostService(postDispatch, setIsBtnDisabled, token, post._id)
    };

    return (
      <Card w="full" maxW="600px" mb={4} boxShadow="0 0 10px 0 rgba(0,0,0,0.15)">
        <CardBody py={4} px={4}>
          <Flex gap={2}>
            <Link to={`/profile/${post.username}`}>
              <Box w="50px" h="50px">
                <Avatar
                  src={user?.profileAvatar}
                  name={`${user?.firstName} ${user?.lastName}`}
                />
              </Box>
            </Link>
            <Flex flexGrow={1} justifyContent="space-between">
              <Flex flexDir="column" justifyContent="center">
                <Flex gap={2} alignItems="center">
                  <Link to={`/profile/${post.username}`}>
                    <Heading size="md">{`${user?.firstName} ${user?.lastName}`}</Heading>
                  </Link>
                  <Text fontSize="sm">

                    {getHumanizeTimePost(post?.createdAt)}
                  </Text>
                </Flex>
                <Text>@{post?.username}</Text>
              </Flex>
              {isPostCreator && (
                <Flex>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                      variant="ghost"
                      borderRadius="full"
                    />
                    <MenuList minW="8rem">
                      <MenuItem icon={<EditIcon />} isDisabled={isBtnDisabled} onClick={onOpen}>
                        Edit
                      </MenuItem>
                      <NewPostModal
                        isOpen={isOpen}
                        onClose={onClose}
                        postDetails={post}
                      />
                      <MenuItem
                        color={'red.400'}
                        icon={<DeleteIcon />}
                        isDisabled={isBtnDisabled}
                        onClick={() => deleteHandler()}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex flexDir="column" gap={4} mt={4}>
            <Text>{post?.content}</Text>
            {post?.mediaURL &&
              (post?.mediaURL.split("/")[4] === "image" ? (
                <Image src={post?.mediaURL}  alt={'image'}/>
              ) : (
                <video
                  controls
                >
                  <source src={post?.mediaURL} type="video/mp4" preload="auto"/>
                </video>
              ))
            }

          </Flex>
        </CardBody>

        <Divider borderColor="gray.500" />

        <CardFooter p={2}>
          <Flex w="full">
            <Flex alignItems="center">
              <IconButton
                borderRadius="full"
                icon={
                  <FontAwesomeIcon
                    icon={isLiked ? faHeartSolid : faHeart}
                    color={isLiked ? '#E53E3E' : 'null'}
                  />
                }
                bg="transparent"
                isDisabled={isBtnDisabled}
                onClick={() => likeHandler()}
              />
              {post?.likes?.likeCount > 0 && <Text>{post?.likes?.likeCount}</Text>}
              <IconButton
                borderRadius="full"
                icon={
                  <FontAwesomeIcon
                    icon={isBookmarked ? faBookmarkSolid : faBookmark}
                    color={isBookmarked ? '#4299E1' : 'null'}
                  />
                }
                bg="transparent"
                isDisabled={isBtnDisabled}
                onClick={() => bookmarkHandler()}
              />
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
    );
  };

  export default PostCard;
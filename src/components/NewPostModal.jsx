import {Avatar,Box,Button,Divider,Flex,FormControl,FormLabel,Image,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,Spacer,Spinner,Textarea} from '@chakra-ui/react';
  import React, { useRef, useState } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
  import {useAuth} from "../context/AuthContext";
  import { uploadMedia } from '../util/commonFunction';
  import { createPostService, editPostService } from '../services/postService';
  import { initialPostData } from '../reducer/PostReducer';
import { usePost } from '../context/PostContext';

  const NewPostModal = ({ isOpen, onClose, postDetails }) => {

    const {user:authUser, token} = useAuth();
	const {postDispatch} = usePost();
	const [postData, setPostData] = useState(postDetails || initialPostData);
	const inputFocusRef = useRef();
	const [isMediaUploading, setIsMediaUploading] = useState(false);
	const [isServiceCalling, setIsServiceCalling] = useState(false);
	const isSubmitDisabled = postData?.content?.trim().length === 0;

	const postHandler = async () => {
	  if (postDetails) {
		editPostService(postDispatch, setIsServiceCalling, token, postData);
	  } else {
		createPostService(postDispatch, setIsServiceCalling, token, postData);
		setPostData(initialPostData);
	  }
	  onClose();
	};

	const mediaUploadHandler = async (e) => {
	  setIsMediaUploading(true);
	  await uploadMedia(e.target.files[0], setPostData);
	  setIsMediaUploading(false);
	  e.target.value = null;
	};

	const inputHandler = (e, inputType) => {
	  setPostData(prev => ({ ...prev, [inputType]: e.target.value }));
	};

	const handleMediaRemove = () => {
	  setPostData(prev => ({ ...prev, mediaURL: '' }));
	};

	const cancelPostHandler = () => {
	  setPostData(initialPostData);
	  onClose();
	};

    return (
		<Modal
		initialFocusRef={inputFocusRef}
		isOpen={isOpen}
		onClose={cancelPostHandler}
		size="xl"
	  >
		<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(0.5rem)' />
		<ModalContent w={{ base: '90vw' }}>
		  <ModalHeader>{postDetails ? 'Edit Post' : 'Create Post'}</ModalHeader>
		  <ModalCloseButton />
		  <Divider borderColor="gray.500" />
		  <ModalBody p={4}>
			<Flex gap={2} h="10rem">
			  <Box w="50px" h="50px">
				<Avatar
				  src={authUser.profileAvatar}
				  name={`${authUser?.firstName} ${authUser?.lastName}`}
				/>
			  </Box>
			  <Box flexGrow={1}>
				<Textarea
				  ref={inputFocusRef}
				  h="full"
				  p={2}
				  outline="none"
				  border="none"
				  resize="none"
				  focusBorderColor="transparent"
				  placeholder={`What is happening ${authUser?.firstName}?!`}
				  value={postData.content}
				  onChange={e => inputHandler(e, 'content')}
				/>
			  </Box>
			</Flex>
			{isMediaUploading && <Spinner />}
			{
				postData?.mediaURL &&
				(
					<Box w="8rem">
						{
							postData?.mediaURL.split("/")[4] === "image" ? (
								<Image src={postData?.mediaURL}  alt={'image'}/>
							) : (
								<video controls>
									<source src={postData?.mediaURL} type="video/mp4" preload="auto"/>
								</video>
							)
						}
						<Button w="full" size="sm" onClick={handleMediaRemove}>
							Remove
						</Button>
					</Box>
				)
            }
		  </ModalBody>
		  <Divider borderColor="gray.500" />
		  <ModalFooter p={2}>
			<Flex w="full">
			  <Flex alignItems="center" ml={2} gap={2}>
				<FormControl display="flex" alignItems="center" width="1rem">
				  <FormLabel m={0} cursor="pointer">
					<FontAwesomeIcon icon={faPhotoFilm} />
				  </FormLabel>
				  <Input
					type="file"
					display="none"
					accept="image/*, video/*"
					onChange={mediaUploadHandler}
				  />
				</FormControl>
			  </Flex>
			  <Spacer />
			  <Button
				colorScheme="blue"
				borderRadius="full"
				onClick={postHandler}
				isDisabled={isSubmitDisabled || isServiceCalling}
			  >
				{postDetails ? 'Update' : 'Post'}
			  </Button>
			</Flex>
		  </ModalFooter>
		</ModalContent>
	  </Modal>
    );
  };

  export default NewPostModal;
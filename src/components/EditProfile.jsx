import {Avatar,Box,Button,Flex,FormControl,FormLabel,Heading,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,Text,Textarea,Divider} from '@chakra-ui/react';
import React, { useState } from 'react';
import AvatarUploadMenu from './AvatarUploadMenu';
import {editUserProfileService} from "../services/userService";
import {useUser} from "../context/UserContext";
import {useAuth} from "../context/AuthContext";
import { TOAST_CONFIG } from "../util/constants";
import { toast } from "react-toastify";
  const EditProfile = ({ isOpen, onClose, user }) => {

    const [updatedDetails, setUpdatedDetails] = useState({
        firstName : user?.firstName,
        lastName : user?.lastName,
        bio: user?.bio,
        website: user?.website,
        profileAvatar: user?.profileAvatar
    });

    const {setUser, token} = useAuth();
    const {isBtnDisabled, setIsBtnDisabled, userDispatch} = useUser();

    const inputHandler = (e, inputName) => {
      setUpdatedDetails(prev => ({
        ...prev,
        [inputName]: e.target.value,
      }));
    };

    const handleImageSelect = e => {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUpdatedDetails(prev => ({ ...prev, profileAvatar: imageUrl }));
    };

    const handleAvatarSelect = e => {
      setUpdatedDetails(prev => ({ ...prev, profileAvatar: e.target.src }));
    };

    const closeHandler = () => {
      setUpdatedDetails({
        firstName : user?.firstName,
        lastName : user?.lastName,
        bio: user?.bio,
        website: user?.website,
        profileAvatar: user?.profileAvatar
      });
      onClose();
    };

    const submitProfileEdit = async (e) => {
      e.preventDefault();
	  if(!updatedDetails?.firstName) {
		toast.error(`First name is required.`, TOAST_CONFIG);
		return
	  } else if(!updatedDetails?.lastName) {
		toast.error(`Last name is required.`, TOAST_CONFIG);
		return
	  }
      if (updatedDetails?.firstName && updatedDetails?.lastName) {
        editUserProfileService(userDispatch, setIsBtnDisabled, setUser, token, { ...user, ...updatedDetails });
      }
      onClose();
    };

    return (
      <Modal isOpen={isOpen} onClose={closeHandler} size="lg" m="2">
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(0.5rem)' />
        <ModalContent w="90%">
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
		  <Divider borderColor="gray.500" />
          <form onSubmit={submitProfileEdit}>
            <ModalBody justifyContent="space-between">
              <Flex flexDir="column" gap={2}>
                <Flex gap={5}>
                  <Flex pos="relative">
                    <Avatar
                      src={updatedDetails?.profileAvatar}
                      alt="profile-image"
                      size="lg"
                      marginRight="2"
                    />
                    <Box pos="absolute" right={-3} bottom={-3}>
                      <AvatarUploadMenu
                        handleAvatarSelect={handleAvatarSelect}
                        handleImageSelect={handleImageSelect}
                      />
                    </Box>
                  </Flex>
                  <Flex display="flex" flexDir="column" gap={2}>
                    <Heading size="md">{`${user?.firstName} ${user?.lastName}`}</Heading>
                    <Text>@{user?.username}</Text>
                  </Flex>
                </Flex>
                <FormControl isRequired>
                  <FormLabel>First Name  </FormLabel>
                  <Input
                    type='text'
                    value={updatedDetails?.firstName}
                    onChange={e => inputHandler(e, 'firstName')}
                    required={true}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name  </FormLabel>
                  <Input
                    type='text'
                    value={updatedDetails?.lastName}
                    onChange={e => inputHandler(e, 'lastName')}
                    required={true}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Bio</FormLabel>
                    <Textarea
                        value={updatedDetails?.bio}
                        onChange={e => inputHandler(e, 'bio')}
                        size='sm'
                        resize="none"
                        rows={'2'}
                    />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Website</FormLabel>
                  <Input
                    type='url'
                    value={updatedDetails?.website}
                    onChange={e => inputHandler(e, 'website')}
                  />
                </FormControl>
              </Flex>
            </ModalBody>
			<Divider borderColor="gray.500" pt={2}/>
            <ModalFooter>
              <Button
                mr={3}
                colorScheme="blue"
                type="submit"
                isDisabled={!updatedDetails?.firstName?.length || !updatedDetails?.lastName?.length || isBtnDisabled}
                onClick={submitProfileEdit}
              >
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };

  export default EditProfile;
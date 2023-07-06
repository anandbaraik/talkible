import {TOAST_CONFIG} from "./constants"
import { toast } from "react-toastify";
export const uploadMedia = async(media, setPostData) => {
  	const mediaType = media.type.split('/')[0];
    if (mediaType === 'video' && Math.round(media.size / 1024000) > 10) {
		toast.error(`Video size should be less than 10MB`, TOAST_CONFIG);
	} else if (Math.round(media.size / 1024000) > 4) {
		toast.error(`Image/GIF size should be less than 4MB`, TOAST_CONFIG);
	} else {
      const data = new FormData();
      data.append('file', media);
      data.append('upload_preset',process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      data.append('folder', process.env.REACT_APP_CLOUDINARY_FOLDER_NAME);
      const requestOptions = {
        method: 'POST',
        body: data,
      };

      let url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
	  if(mediaType === 'video') {
		url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/video/upload`;
	  }
      await fetch(url, requestOptions)
        .then(response => response.json())
        .then(json => {
          setPostData(prev => ({ ...prev, mediaURL: json.url }));
          return [json.secure_url];
        })
        .catch(error => {
          console.error(`uploadMedia: error while uploading a media`, error);
          toast.error('Uploading a media failed!', TOAST_CONFIG);
        });
    }
};

export function getHumanizeTimePost(date) {
	const createdDate = new Date(date);
	const currentDate = new Date();
	const milliseconds = Math.floor(currentDate - createdDate);
	const sec = Math.floor(milliseconds / 1000);
	if (sec > 59) {
	  const min = Math.floor(sec / 60);
	  if (min > 59) {
		const hr = Math.floor(min / 60);
		if (hr > 23) {
		  return createdDate.toLocaleDateString("en-us", {
			day: "numeric",
			year: "numeric",
			month: "short",
		  });
		} else {
		  return hr > 1 ? `${hr} hrs ago` : `${hr} hr ago`;
		}
	  } else {
		return min > 1 ? `${min} mins ago` : `${min} min ago`;
	  }
	} else {
	  return sec > 1 ? `${sec} secs ago` : `${sec} sec ago`;
	}
}

export const getUserSuggestions = (allUsers, authUser) => {
    const usersList = allUsers?.filter(({ username }) => {
        return (username !== authUser?.username) && !authUser?.following?.some(followed => followed?.username === username);
    });

    return usersList;
}

export const getSearchSuggestions = (allUsers, searchTerm) => {

    const search = searchTerm?.toLowerCase()?.trim();

    if(search?.length > 0) {
        return allUsers?.filter((user) => {
            return user?.firstName.toLowerCase().includes(search) || user?.lastName.toLowerCase().includes(search) || user?.username.toLowerCase().includes(search);
        });
    }

    return allUsers;
  };

export const getPostsBySortingType = (allPosts, sortBy) => {

	if (sortBy === "Latest") {
		return [...allPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	}

	if (sortBy === "Oldest") {
		return [...allPosts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
	}

	if (sortBy === "Trending") {
		return [...allPosts].sort((a, b) => b.likes.likeCount - a.likes.likeCount);
	}

	return allPosts;
}
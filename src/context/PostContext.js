import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { initialState, postsReducer } from "../reducer/PostReducer";
import { getAllPostsService } from "../services/postService";

const PostContext = createContext({
  posts: [],
  postDispatch: () => {},
  sortBy: "Latest",
  isLoading: false,
  setIsLoading: () => {}
});

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllPostsService(dispatch, setIsLoading);
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        sortBy: state.sortBy,
        postDispatch: dispatch,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
import { ACTION_TYPE } from "../util/constants";

export const initialPostData = {
    content: "",
    mediaURL: null
};

const initialState = {
  posts: [],
  postData: initialPostData,
  sortBy: "Latest",
};


const postsReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.INITIALIZE_ALL_POSTS:
      return { ...state, posts: payload };
    case ACTION_TYPE.CREATE_POST:
      return { ...state, posts: payload };
    case ACTION_TYPE.LIKE_POST:
      return { ...state, posts: payload };
    case ACTION_TYPE.UNLIKE_POST:
      return { ...state, posts: payload };
    case ACTION_TYPE.DELETE_POST:
      return { ...state, posts: payload };
    case ACTION_TYPE.EDIT_POST:
      return { ...state, posts: payload };
    case ACTION_TYPE.SORT_BY:
      return { ...state, sortBy: payload };
    default:
      return state;
  }
};

export { initialState, postsReducer };
import { ACTION_TYPE } from "../util/constants";

export const initialState = {
  users: [],
  bookmarks: [],
  user: {}
};

export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.INITIALIZE_ALL_USERS:
      return {
        ...state,
        users: [...payload]
      };
    case ACTION_TYPE.INITIALIZE_ALL_BOOKMARKS:
      return {
        ...state,
        bookmarks: [...payload]
      };
    case ACTION_TYPE.ADD_TO_BOOKMARK:
      return {
        ...state,
        bookmarks: [...payload]
      };
    case ACTION_TYPE.REMOVE_FROM_BOOKMARK:
      return {
        ...state,
        bookmarks: [...payload]
      };
	case ACTION_TYPE.UPDATE_FOLLOW_USER:
		const { user, followUser } = payload;
		return {
			...state,
			users: state.users.map(currentUser =>
				currentUser.username === user.username
				  ? { ...user }
				  : currentUser.username === followUser.username
				  ? { ...followUser }
				  : currentUser
			  ),
		};
	case ACTION_TYPE.EDIT_USER_PROFILE:
		return {
			...state,
			users: state?.users.map((user) =>
				user._id === payload._id ? payload : user
			)
		};
    default:
      return  state;
  }
};
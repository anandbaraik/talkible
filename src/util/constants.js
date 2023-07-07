export const ACTION_TYPE = {
    INITIALIZE_ALL_POSTS: "INITIALIZE_ALL_POSTS",
    CREATE_POST: "CREATE_POST",
    LIKE_POST: "LIKE_POST",
    UNLIKE_POST: "UNLIKE_POST",
    SORT_BY: "SORT_BY",
    INITIALIZE_ALL_USERS: "INITIALIZE_ALL_USERS",
    INITIALIZE_ALL_BOOKMARKS: "INITIALIZE_ALL_BOOKMARKS",
    ADD_TO_BOOKMARK: "ADD_TO_BOOKMARK",
    REMOVE_FROM_BOOKMARK: "REMOVE_FROM_BOOKMARK",
    UPDATE_FOLLOW_USER: "UPDATE_FOLLOW_USER",
    EDIT_USER_PROFILE: "EDIT_USER_PROFILE"
};

export const LIMIT = {
    POST_CONTENT: 300,
};
export const TOAST_CONFIG = {
    position: "top-right",
    autoClose: 700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getAllUsersService } from "../services/userService";
import { initialState, userReducer } from "../reducer/UserReducer";
const UserContext = createContext({
  users: [],
  bookmarks: [],
  user: {},
  userDispatch: () => {},
  isLoading: false,
  setIsLoading : () => {},
  isBtnDisabled: false,
  setIsBtnDisabled : () => {}
});

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  useEffect(() => {
    getAllUsersService(dispatch, setIsLoading);
  },[]);

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        bookmarks: state.bookmarks,
        user: state.user,
        userDispatch: dispatch,
        isLoading,
        setIsLoading,
        isBtnDisabled,
        setIsBtnDisabled
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
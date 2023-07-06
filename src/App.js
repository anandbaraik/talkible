import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import '@fontsource/spectral/400.css';
import '@fontsource/spectral/700.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';

import theme from './ChakraConfig/theme';

import RootLayout from "./components/RootLayout";
import PrivateRoute from './components/PrivateRoute';

import BookmarksPage from "./pages/BookmarksPage";
import ErrorPage from "./pages/ErrorPage";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import LikedPage from "./pages/LikedPage";
import PostDetailPage from "./pages/PostDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/explore',
        element: <ExplorePage />,
      },
      {
        path: '/bookmarks',
        element: <BookmarksPage />,
      },
      {
        path: '/liked',
        element: <LikedPage />,
      },
      {
        path: '/post/:id',
        element: <PostDetailPage />,
      },
      {
        path: '/profile/:username',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '/signin',
    element: <SigninPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}/>
    </ChakraProvider>
  );
}

export default App;

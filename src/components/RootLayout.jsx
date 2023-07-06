import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import LeftSidebarNav from './LeftSidebarNav';
import RightSidebar from './RightSidebar';
import { ColorModeScript } from '@chakra-ui/react';
import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
const RootLayout = () => {
  return (
    <Grid
      minH="100dvh"
      templateColumns={{ base: 'auto 1fr', lg: '1fr 3fr 1fr' }}
      templateRows={{
        base: 'auto calc(100dvh - 56.8px - 82.4px) auto',
        lg: 'auto calc(100dvh - 56.8px)',
      }}
      templateAreas={{
        base: `"header header header"
                "main main main"
                "nav nav nav"`,
        lg: `"header header header"
              "nav main aside"`,
      }}
    >
      <GridItem as={'header'} area="header" pos="sticky" top="0" zIndex="5">
        <Navbar />
      </GridItem>
      <GridItem as={'nav'} area="nav">
        <LeftSidebarNav/>
      </GridItem>
      <GridItem
        scrollBehavior="smooth"
        as={'main'}
        area="main"
        overflowY="scroll"
        css={{
          '&::-webkit-scrollbar': {
            width: '2px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: useColorModeValue('#cbd5e0', '#90CDF4'),
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Outlet />
        <ColorModeScript />
      </GridItem>
      <GridItem
        as={'aside'}
        area={'aside'}
        display={{ base: 'none', lg: 'block' }}
      >
        <RightSidebar />
      </GridItem>
    </Grid>
  )
}

export default RootLayout
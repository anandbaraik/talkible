import {Button,Flex,Heading,Menu,MenuButton,MenuItem,MenuList} from '@chakra-ui/react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import React, { useRef, useState } from 'react';
  import { faSliders } from '@fortawesome/free-solid-svg-icons';
  import { ACTION_TYPE } from '../util/constants';
  const SortBar = ({ sortBy, setSortBy }) => {
	const [sortingOptions, setSortingOptions] = useState([
		'Latest', 'Trending', 'Oldest'
	]);
    const sortingRef = useRef();
    return (
      <Flex
        w="full"
        maxW="600px"
        py={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading size="md" ml={2}>
          {sortBy} Posts
        </Heading>
        <Menu initialFocusRef={sortingRef}>
          <MenuButton as={Button} variant="ghost" borderRadius="full">
            <FontAwesomeIcon icon={faSliders} size="lg" />
          </MenuButton>
          <MenuList minW="8rem">
            {sortingOptions?.map(sort => (
              <MenuItem
                key={sort}
                ref={sortBy === sort ? sortingRef : null}
                onClick={() => setSortBy({type: ACTION_TYPE.SORT_BY , payload: sort})}
              >
                {sort}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    );
  };

  export default SortBar;
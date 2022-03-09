import React from "react";
import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
import { Box, Center, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { craftcutsMap, craftcutsMapArr, updateShortcutsData } from "../settingsUtils";

const RemoveShortcutButton: React.FC = () => {
  const toast = useToast();
  const onClick = async (val:string) => {

    craftcutsMap.delete(val);
    updateShortcutsData();

    if (!toast.isActive("removedToast")) {
    toast({
      id: 'removedToast',
      position: "bottom",
      duration: 1000,
      render: () => (
        <Center>
          <Box color='white' w='80%' borderRadius='lg' p={3} bg='grey.500'>
            Removed Shortcut
          </Box>
        </Center>
      ),
    })
  }
  }
  return (
    <Menu isLazy >
      {({ isOpen }) => (
        <>
          <MenuButton
          isActive={isOpen}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          colorScheme='red'
          width="100%"
          mb="2">
            {isOpen ? 'Abort' : 'Remove Shortcut'}
          </MenuButton >
          <MenuList>
          {
            craftcutsMapArr
              .map((element) => (
                <MenuItem onClick={() => onClick(element[0])}>{element[0]}</MenuItem>
              ))
          }
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export default RemoveShortcutButton;

// {
//   craftcutsMapArr
//     .map((element) => (
//       <MenuItem onClick={() => onClick(element[0])}</MenuItem>
//     ))
// }

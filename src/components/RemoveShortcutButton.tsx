import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Center, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import React from "react";
import { Craftcut, craftcutsObjects, updateShortcutsData } from "../settingsUtils";

const RemoveShortcutButton: React.FC = () => {
  const toast = useToast();
  const onClick = async (val: Craftcut) => {

    let index = craftcutsObjects.indexOf(val, 0);
    if (index != -1) {
      craftcutsObjects.splice(index, 1);
    }

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
              craftcutsObjects
                .map((element) => (
                  <MenuItem onClick={() => onClick(element)}>{element.getDisplayName()}</MenuItem>
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

import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
import { Box, Center, FormControl, Input, Stack } from "@chakra-ui/react";
import { craftcutsMap, updateShortcutsData } from "../settingsUtils";

const AddShortcutButton: React.FC = () => {
  const toast = useToast();
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = React.useState(false);
  const onClick = async () => {
    setIsLoading(true);

    let encodedInput = encodeURIComponent(input)
    craftcutsMap.set(input,encodedInput)
    updateShortcutsData();
    setIsLoading(false);

    if (!toast.isActive("addedToast")) {
    toast({
      id: "addedToast",
      position: "bottom",
      duration: 1000,
      render: () => (
        <Center>
          <Box color='white' w='80%' borderRadius='lg' p={3} bg='blue.500'>
            Added Shortcut: {input}
          </Box>
        </Center>
      ),
    })
  }
  }
  return (

    <FormControl>
    <Stack>

    <Input
    id='shortcutName'
    type='text'
    value={input}
    onChange={(e) => setInput(e.target.value)}
    />
              <Button
                mt={4}
                leftIcon={<PlusSquareIcon />}
                colorScheme='teal'
                onClick={onClick}
                isLoading={isLoading}
                type='submit'
              >
                Add Shortcut
              </Button>
              </Stack>
            </FormControl>


  );
}

export default AddShortcutButton;


//<Button
//   leftIcon={<CalendarIcon />}
//   colorScheme='red'
//   onClick={onClick}
//   width="100%"
//   mb="2"
//   isLoading={isLoading}
// >
//   Add Shortcut
//   </Button>

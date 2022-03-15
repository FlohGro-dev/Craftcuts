import React from "react";
import { Button } from "@chakra-ui/button";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
import { Box, Center, Checkbox, CheckboxGroup, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { craftcutsSet, Craftcut, updateShortcutsData, craftcutsObjects } from "../settingsUtils";

const AddShortcutMenuButton: React.FC = () => {
  // const projectList = useRecoilValue(States.projects);
  const toast = useToast();
  const [isLoadingSet, setIsLoadingSet] = React.useState(false);
  const [exactName, setExactName] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");

  const [inputPageTitle, setInputPageTitle] = React.useState("");
  const [inputSelection, setInputSelection] = React.useState("");
  const [inputOpenTasks, setInputOpenTasks] = React.useState("");
  const [inputAllUrls, setInputAllUrls] = React.useState("");
  const [inputAllBlocks, setInputAllBlocks] = React.useState("");

  const [inputSeparator, setInputSeparator] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onAdd = async () => {
    setIsLoadingSet(true);

    let inputSettings:string[] = [];

    if(inputPageTitle != ""){
      inputSettings.push(inputPageTitle)
    }

    if(inputSelection != ""){
      inputSettings.push(inputSelection)
    }

    if(inputOpenTasks != ""){
      inputSettings.push(inputOpenTasks)
    }

    if(inputAllUrls != ""){
      inputSettings.push(inputAllUrls);
    }

    if(inputAllBlocks != ""){
      inputSettings.push(inputAllBlocks)
    }

    let data = JSON.stringify(new Craftcut(exactName, displayName, inputSettings, inputSeparator));
    let craftcut = Craftcut.fromJSON(JSON.parse(data));

    craftcutsSet.add(craftcut)
    craftcutsObjects.push(craftcut)


    toast({
      id: "addedToast",
      position: "bottom",
      duration: 2000,
      render: () => (
        <Center>
          <Box color='white' w='80%' borderRadius='lg' p={3} bg='blue.500'>
            Added Shortcut: {exactName}
          </Box>
        </Center>
      ),
    })
    updateShortcutsData();

    // reset input fields
    setExactName("");
    setDisplayName("");
    setInputSeparator("");

    setIsLoadingSet(false);
  }
  return (
    <>
      <Button onClick={onOpen}
      width="100%"
      leftIcon={<PlusSquareIcon />}
      colorScheme='green'
      variant='solid'
      >Add Shortcut</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Add Shortcut</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <Stack spacing='10px' direction={['column']}>
            <FormControl>
              <FormLabel>Shortcut Name</FormLabel>
              <Input
              placeholder='insert the exact Shortcut name'
              value={exactName}
              onChange={(e) => setExactName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Display Name</FormLabel>
              <Input
              placeholder='insert the display name for the Shortcut'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              />
            </FormControl>
            <FormControl>
            <CheckboxGroup colorScheme='purple' defaultValue={[""]}> Shortcut Input
              <FormHelperText>Select the input which shall be provided to the Shortcut (all with links to the original block(s))</FormHelperText>
              <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox value='pageTitle' onChange={(e) => setInputPageTitle(e.target.checked ? "pageTitle":"")}>page title</Checkbox>
              <Checkbox value='selection' onChange={(e) => setInputSelection(e.target.checked ? "selection":"")}>selected blocks</Checkbox>
              <Checkbox value='openTasks' onChange={(e) => setInputOpenTasks(e.target.checked ? "openTasks":"")}>open tasks</Checkbox>
              <Checkbox value='allUrls' onChange={(e) => setInputAllUrls(e.target.checked ? "allUrls":"")}>url blocks</Checkbox>
              <Checkbox value='allBlocks' onChange={(e) => setInputAllBlocks(e.target.checked ? "allBlocks":"")}>all blocks</Checkbox>
              </Stack>
            </CheckboxGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Separator</FormLabel>
              <Input
              placeholder='set a separator if you selected multiple inputs'
              value={inputSeparator}
              onChange={(e) => setInputSeparator(e.target.value)}
              />
            </FormControl>
          </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={onAdd} isLoading={isLoadingSet}>
              Add Shortcut
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddShortcutMenuButton;

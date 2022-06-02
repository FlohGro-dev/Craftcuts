import { Button } from "@chakra-ui/button";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Center, Checkbox, CheckboxGroup, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import React from "react";
import { Craftcut, craftcutsObjects, updateShortcutsData } from "../settingsUtils";

const AddShortcutMenuButton: React.FC = () => {
  // const projectList = useRecoilValue(States.projects);
  const toast = useToast();
  const [isLoadingSet, setIsLoadingSet] = React.useState(false);
  const [exactName, setExactName] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");

  const [inputPageTitle, setInputPageTitle] = React.useState("");
  const [inputSelection, setInputSelection] = React.useState("");
  const [inputOpenTasks, setInputOpenTasks] = React.useState("");
  const [inputDoneTasks, setInputDoneTasks] = React.useState("");
  const [inputAllUrls, setInputAllUrls] = React.useState("");
  const [inputAllBlocks, setInputAllBlocks] = React.useState("");
  const [inputCancelAndMoveTasks, setInputCancelAndMoveTasks] = React.useState("");
  const [inputDeleteAndMoveTasks, setInputDeleteAndMoveTasks] = React.useState("");

  const [inputSeparator, setInputSeparator] = React.useState("");

  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setInputPageTitle("")
    setInputSelection("")
    setInputOpenTasks("")
    setInputDoneTasks("")
    setInputAllUrls("")
    setInputAllBlocks("")
    setInputCancelAndMoveTasks("")
    setInputDeleteAndMoveTasks("")
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const onAdd = async () => {
    setIsLoadingSet(true);
    let inputSettings: string[] = [];


    if (inputPageTitle != "") {
      inputSettings.push(inputPageTitle)
    }

    if (inputSelection != "") {
      inputSettings.push(inputSelection)
    }

    if (inputOpenTasks != "") {
      inputSettings.push(inputOpenTasks)
    }

    if (inputDoneTasks != "") {
      inputSettings.push(inputDoneTasks)
    }

    if (inputAllUrls != "") {
      inputSettings.push(inputAllUrls);
    }

    if (inputAllBlocks != "") {
      inputSettings.push(inputAllBlocks)
    }


    let isValid = true;
    let errorString = "";

    // advanced inputs

    if (inputCancelAndMoveTasks != "") {
      inputSettings.push(inputCancelAndMoveTasks)
      if (inputSettings.length > 1) {
        // invlalidate the configuration - currently just supported as single import
        isValid = false;
        errorString = "not supported with several inputs"
      }
    }

    if (inputDeleteAndMoveTasks != "") {
      inputSettings.push(inputDeleteAndMoveTasks)
      if (inputSettings.length > 1) {
        // invlalidate the configuration - currently just supported as single import
        isValid = false;
        errorString = "not supported with several inputs"
      }
    }


    if (inputSettings.length > 1 && inputSeparator == "") {
      // a separator is needed -> abort the creation
      isValid = false;
      errorString = "Aborted: Please add a Separator"
    }

    if (displayName == "") {
      // no valid displayName
      isValid = false;
      errorString = "Aborted: Please add a display name"
    }


    if (exactName == "") {
      // no valid displayName
      isValid = false;
      errorString = "Aborted: Please add the Shortcut name"
    }

    if (!isValid) {
      // a separator is needed -> abort the creation
      toast({
        id: "addedToast",
        position: "bottom",
        duration: 2000,
        render: () => (
          <Center>
            <Box color='white' w='90%' borderRadius='lg' p={3} bg='red.500'>
              {errorString}
            </Box>
          </Center>
        ),
      })

    } else {
      let data = JSON.stringify(new Craftcut(exactName, displayName, inputSettings, inputSeparator));
      let craftcut = Craftcut.fromJSON(JSON.parse(data));

      //craftcutsSet.add(craftcut)
      craftcutsObjects.push(craftcut)


      toast({
        id: "addedToast",
        position: "bottom",
        duration: 2000,
        render: () => (
          <Center>
            <Box color='white' w='90%' borderRadius='lg' p={3} bg='blue.500'>
              Added Shortcut: {displayName}
            </Box>
          </Center>
        ),
      })
      // reset input fields
      setExactName("");
      setDisplayName("");
      setInputSeparator("");
      updateShortcutsData();
      handleClose();
    }

    setIsLoadingSet(false);

  }
  return (
    <>
      <Button onClick={handleShow}
        width="100%"
        leftIcon={<PlusSquareIcon />}
        colorScheme='green'
        variant='solid'
      >Add Shortcut</Button>

      <Modal
        isOpen={show}
        onClose={handleClose}
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
                    <Checkbox value='pageTitle' onChange={(e) => setInputPageTitle(e.target.checked ? "pageTitle" : "")}>page title</Checkbox>
                    <Checkbox value='selection' onChange={(e) => setInputSelection(e.target.checked ? "selection" : "")}>selected blocks</Checkbox>
                    <Checkbox value='openTasks' onChange={(e) => setInputOpenTasks(e.target.checked ? "openTasks" : "")}>open tasks</Checkbox>
                    <Checkbox value='doneTasks' onChange={(e) => setInputDoneTasks(e.target.checked ? "doneTasks" : "")}>done tasks</Checkbox>
                    <Checkbox value='allUrls' onChange={(e) => setInputAllUrls(e.target.checked ? "allUrls" : "")}>url blocks</Checkbox>
                    <Checkbox value='allBlocks' onChange={(e) => setInputAllBlocks(e.target.checked ? "allBlocks" : "")}>all blocks</Checkbox>
                  </Stack>
                </CheckboxGroup>
                <CheckboxGroup colorScheme='purple' defaultValue={[""]}> Input with block modifications
                  <FormHelperText>These inputs will modify blocks in your document</FormHelperText>
                  <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox value='cancelAndMoveTasks' onChange={(e) => setInputCancelAndMoveTasks(e.target.checked ? "cancelAndMoveTasks" : "")}>cancel and move tasks</Checkbox>
                    <Checkbox value='deleteAndMoveTasks' onChange={(e) => setInputDeleteAndMoveTasks(e.target.checked ? "deleteAndMoveTasks" : "")}>delete and move tasks</Checkbox>
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

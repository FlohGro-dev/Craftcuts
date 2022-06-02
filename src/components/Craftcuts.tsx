import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Center, Checkbox, CheckboxGroup, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useToast } from "@chakra-ui/react";
import React from "react";
import { getAllBlocksFromCurrentPage, getAllUrlsFromCurrentPage, getAndCancelUncheckedTodoItemsFromCurrentPage, getAndDeleteUncheckedTodoItemsFromCurrentPage, getCheckedTodoItemsFromCurrentPage, getSelectedBlocksAsMdStingsFromCurrentPage, getTitleOfCurrentPage, getUncheckedTodoItemsFromCurrentPage } from "../craftBlockInteractor";
import { Craftcut, craftcutsObjects, updateShortcutsData } from "../settingsUtils";

const Craftcuts: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [isLoadingEdit, setIsLoadingEdit] = React.useState(false);
  const [exactName, setExactName] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [inputSeparator, setInputSeparator] = React.useState("");

  const [inputPageTitle, setInputPageTitle] = React.useState("");
  const [inputSelection, setInputSelection] = React.useState("");
  const [inputOpenTasks, setInputOpenTasks] = React.useState("");
  const [inputDoneTasks, setInputDoneTasks] = React.useState("");
  const [inputAllUrls, setInputAllUrls] = React.useState("");
  const [inputAllBlocks, setInputAllBlocks] = React.useState("");
  const [inputCancelAndMoveTasks, setInputCancelAndMoveTasks] = React.useState("");
  const [inputDeleteAndMoveTasks, setInputDeleteAndMoveTasks] = React.useState("");

  const [inputVals, setInputVals] = React.useState([""]);

  const toast = useToast();

  const [scToEditIdentifier, setScToEditIdentifier] = React.useState("");

  const [show, setShow] = React.useState(false);
  const handleShowEdit = (craftcut: Craftcut) => {
    setScToEditIdentifier(craftcut.getExactName() + craftcut.getDisplayName() + craftcut.getInputSettings().join(","));
    setExactName(craftcut.getExactName());
    setDisplayName(craftcut.getDisplayName());
    setInputSeparator(craftcut.getInputSeparator());
    let inputSettings = craftcut.getInputSettings();
    setInputVals(inputSettings)
    if (inputSettings.includes("pageTitle")) {
      setInputPageTitle("pageTitle")
    }
    if (inputSettings.includes("selection")) {
      setInputSelection("selection")
    }
    if (inputSettings.includes("openTasks")) {
      setInputOpenTasks("openTasks")
    }
    if (inputSettings.includes("doneTasks")) {
      setInputDoneTasks("doneTasks")
    }
    if (inputSettings.includes("allUrls")) {
      setInputAllUrls("allUrls")
    }
    if (inputSettings.includes("allBlocks")) {
      setInputAllBlocks("allBlocks")
    }
    if (inputSettings.includes("cancelAndMoveTasks")) {
      setInputCancelAndMoveTasks("cancelAndMoveTasks")
    }
    if (inputSettings.includes("deleteAndMoveTasks")) {
      setInputDeleteAndMoveTasks("deleteAndMoveTasks")
    }
    setShow(true)
  };
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



  const onRun = async (craftcut: Craftcut) => {
    setIsLoading(true);
    let shortcutInputBlocks: string[] = [];
    let openUrlOnSuccess = true;

    // decide on input
    const inputSettings = craftcut.getInputSettings()
    let separatorNeeded = false;
    if (inputSettings.length > 1) {
      separatorNeeded = true;
    }

    // work through input in the correct order!

    // title

    if (inputSettings.includes("pageTitle")) {
      let block = await getTitleOfCurrentPage()
      shortcutInputBlocks.push(block);
      if (separatorNeeded) {
        shortcutInputBlocks.push(craftcut.getInputSeparator())
      }
    }


    // selection
    if (inputSettings.includes("selection")) {
      let selectedBlocks = await getSelectedBlocksAsMdStingsFromCurrentPage()
      if (selectedBlocks) {
        shortcutInputBlocks = shortcutInputBlocks.concat(selectedBlocks)
      }
      if (separatorNeeded) {
        shortcutInputBlocks.push(craftcut.getInputSeparator())
      }
    }

    //openTasks

    if (inputSettings.includes("openTasks")) {
      let blocks = await getUncheckedTodoItemsFromCurrentPage()
      if (blocks) {
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if (separatorNeeded) {
        shortcutInputBlocks.push(craftcut.getInputSeparator())
      }
    }

    //doneTasks

    if (inputSettings.includes("doneTasks")) {
      let blocks = await getCheckedTodoItemsFromCurrentPage()
      if (blocks) {
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if (separatorNeeded) {
        shortcutInputBlocks.push(craftcut.getInputSeparator())
      }
    }


    //all Urls
    if (inputSettings.includes("allUrls")) {
      let blocks = await getAllUrlsFromCurrentPage()
      if (blocks) {
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if (separatorNeeded) {
        shortcutInputBlocks.push(craftcut.getInputSeparator())
      }
      //prevent open url if this is enabled
      openUrlOnSuccess = false;
    }

    //allBlocks
    if (inputSettings.includes("allBlocks")) {
      let blocks = await getAllBlocksFromCurrentPage()
      if (blocks) {
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if (separatorNeeded) {
        shortcutInputBlocks.push(craftcut.getInputSeparator())
      }

      // reenable open url if it is disabled
      if (!openUrlOnSuccess) {
        openUrlOnSuccess = true;
      }
    }

    // cancelAndMoveTasks
    if (inputSettings.includes("cancelAndMoveTasks")) {

      let blocks = await getAndCancelUncheckedTodoItemsFromCurrentPage()
      if (blocks) {
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if (separatorNeeded) {
        shortcutInputBlocks.push(craftcut.getInputSeparator())
      }

      // reenable open url if it is disabled
      if (!openUrlOnSuccess) {
        openUrlOnSuccess = true;
      }
    }

    // cancelAndMoveTasks
    if (inputSettings.includes("deleteAndMoveTasks")) {

      let blocks = await getAndDeleteUncheckedTodoItemsFromCurrentPage()
      if (blocks) {
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if (separatorNeeded) {
        shortcutInputBlocks.push(craftcut.getInputSeparator())
      }

      // reenable open url if it is disabled
      if (!openUrlOnSuccess) {
        openUrlOnSuccess = true;
      }
    }

    // remove last separator if it was included
    if (separatorNeeded) {
      shortcutInputBlocks.pop();
    }

    const combinedBlocks = shortcutInputBlocks.join("\n");
    const input = encodeURIComponent(combinedBlocks);


    // now assemble the url
    let xCallbackUrl = "shortcuts://x-callback-url/run-shortcut?name=" + encodeURIComponent(craftcut.getExactName());

    if (shortcutInputBlocks.length > 0) {
      xCallbackUrl = xCallbackUrl + "&input=text&text=" + input;

      if (openUrlOnSuccess) {
        let callbackBlock = shortcutInputBlocks[0];
        const regex = /\[(.*)\]\((.*)\)/;
        const subst = `$2`;
        callbackBlock = callbackBlock.replace(regex, subst);

        // also add the x-success url to open the first block after the shortcut was executed
        // note: this will not work since shortcuts automatically appends a "result=" string to the link and craft can't handle this right now
        xCallbackUrl = xCallbackUrl + "&x-success=" + callbackBlock
      }
    }
    craft.editorApi.openURL(xCallbackUrl);
    setIsLoading(false);
  }

  const onEdit = async () => {

    let foundObj = craftcutsObjects.filter((obj) => obj.getExactName() + obj.getDisplayName() + obj.getInputSettings().join(",") == scToEditIdentifier)

    setIsLoadingEdit(true);
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
        id: "editedToast",
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

      const index: number = craftcutsObjects.indexOf(foundObj[0]);

      if (index !== -1) {
        craftcutsObjects[index] = craftcut;
      }


      toast({
        id: "editedToast",
        position: "bottom",
        duration: 2000,
        render: () => (
          <Center>
            <Box color='white' w='90%' borderRadius='lg' p={3} bg='blue.500'>
              Edited Shortcut: {displayName}
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

    setIsLoadingEdit(false);





  }

  const onMoveUp = () => {
    let foundObj = craftcutsObjects.filter((obj) => obj.getExactName() + obj.getDisplayName() + obj.getInputSettings().join(",") == scToEditIdentifier);
    let curIndex: number = craftcutsObjects.indexOf(foundObj[0]);
    let toastText = "moved up"
    // we need to decrease the index
    let newIndex = curIndex - 1;
    if (newIndex >= 0) {
      craftcutsObjects.splice(newIndex, 0, craftcutsObjects.splice(curIndex, 1)[0])
      updateShortcutsData();
    } else {
      toastText = "already on top"
    }

    toast({
      id: "editedToast",
      position: "bottom",
      duration: 2000,
      render: () => (
        <Center>
          <Box color='white' w='90%' borderRadius='lg' p={3} bg='blue.500'>
            {toastText}
          </Box>
        </Center>
      ),
    })
  }

  const onMoveDown = () => {
    let foundObj = craftcutsObjects.filter((obj) => obj.getExactName() + obj.getDisplayName() + obj.getInputSettings().join(",") == scToEditIdentifier);
    let curIndex: number = craftcutsObjects.indexOf(foundObj[0]);
    let toastText = "moved down"
    // we need to decrease the index
    let newIndex = curIndex + 1;
    if (newIndex < craftcutsObjects.length) {
      craftcutsObjects.splice(newIndex, 0, craftcutsObjects.splice(curIndex, 1)[0])
      updateShortcutsData();
    } else {
      toastText = "already on bottom"
    }

    toast({
      id: "editedToast",
      position: "bottom",
      duration: 2000,
      render: () => (
        <Center>
          <Box color='white' w='90%' borderRadius='lg' p={3} bg='blue.500'>
            {toastText}
          </Box>
        </Center>
      ),
    })
  }

  return (
    <>
      <Stack spacing='2px' direction={['column']}>
        {
          craftcutsObjects
            .map((element) => (
              <ButtonGroup isAttached>
                <Button
                  key={element.getExactName()}
                  rightIcon={<ExternalLinkIcon />}
                  colorScheme='purple'
                  onClick={() => onRun(element)}
                  width="100%"
                  isLoading={isLoading}
                >
                  {element.getDisplayName()}
                </Button>
                <IconButton aria-label='Edit Configuration' icon={<EditIcon />} colorScheme='purple' isLoading={isLoadingEdit} onClick={() => handleShowEdit(element)} />
              </ButtonGroup>
            ))
        }
      </Stack>
      <Modal
        isOpen={show}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Shortcut</ModalHeader>
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
                <CheckboxGroup colorScheme='purple' defaultValue={inputVals}> Shortcut Input
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
                <CheckboxGroup colorScheme='purple' defaultValue={inputVals}> Input with block modifications
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
            <Button colorScheme='purple' leftIcon={<ChevronUpIcon />} mr={2} onClick={onMoveUp}>
              Move Up
            </Button>
            <Button colorScheme='purple' leftIcon={<ChevronDownIcon />} mr={5} onClick={onMoveDown}>
              Move Down
            </Button>
            <Button colorScheme='green' rightIcon={<CheckIcon />} mr={0} onClick={onEdit} isLoading={isLoadingEdit}>
              Apply Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Craftcuts;

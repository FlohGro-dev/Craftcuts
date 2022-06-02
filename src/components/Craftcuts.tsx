import React from "react";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Checkbox, CheckboxGroup, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useToast } from "@chakra-ui/react";
import { Craftcut, craftcutsObjects, updateShortcutsData} from "../settingsUtils";
import { getAllBlocksFromCurrentPage, getAllUrlsFromCurrentPage, getAndCancelUncheckedTodoItemsFromCurrentPage, getAndDeleteUncheckedTodoItemsFromCurrentPage, getCheckedTodoItemsFromCurrentPage, getSelectedBlocksAsMdStingsFromCurrentPage, getTitleOfCurrentPage, getUncheckedTodoItemsFromCurrentPage } from "../craftBlockInteractor";

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


  const [inputPageTitleChecked, setInputPageTitleChecked] = React.useState(false);
  const [inputSelectionChecked, setInputSelectionChecked] = React.useState(false);
  const [inputOpenTasksChecked, setInputOpenTasksChecked] = React.useState(false);
  const [inputDoneTasksChecked, setInputDoneTasksChecked] = React.useState(false);
  const [inputAllUrlsChecked, setInputAllUrlsChecked] = React.useState(false);
  const [inputAllBlocksChecked, setInputAllBlocksChecked] = React.useState(false);
  const [inputCancelAndMoveTasksChecked, setInputCancelAndMoveTasksChecked] = React.useState(false);
  const [inputDeleteAndMoveTasksChecked, setInputDeleteAndMoveTasksChecked] = React.useState(false);
  
  
  const [inputVals, setInputVals] = React.useState([""]);

  const toast = useToast();
  let scToEdit:Craftcut;
  const [show, setShow] = React.useState(false);
  const handleShowEdit = (craftcut:Craftcut) => {
    scToEdit = craftcut;
    setExactName(craftcut.getExactName());
    setDisplayName(craftcut.getDisplayName());
    setInputSeparator(craftcut.getInputSeparator());
    //scToEdit.getInputSettings()
    //scToEdit.getInputSettings()
    let inputSettings = craftcut.getInputSettings();
    setInputVals(inputSettings)
    
if(inputSettings.includes("pageTitle")){
  setInputPageTitleChecked(true);
}
if(inputSettings.includes("selection")){
  setInputSelectionChecked(true);
}
if(inputSettings.includes("openTasks")){
  setInputOpenTasksChecked(true);
}
if(inputSettings.includes("doneTasks")){
  setInputDoneTasksChecked(true);
}
if(inputSettings.includes("allUrls")){
  setInputAllUrlsChecked(true);
}
if(inputSettings.includes("allBlocks")){
  setInputAllBlocksChecked(true);
}
if(inputSettings.includes("cancelAndMoveTasks")){
  setInputCancelAndMoveTasksChecked(true);
}
if(inputSettings.includes("deleteAndMoveTasks")){
  setInputDeleteAndMoveTasksChecked(true);
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



  const onRun = async (craftcut:Craftcut) => {
    setIsLoading(true);
    let shortcutInputBlocks:string[] = [];
    let openUrlOnSuccess = true;

    // decide on input
    const inputSettings = craftcut.getInputSettings()
    let separatorNeeded = false;
    if(inputSettings.length > 1){
      separatorNeeded = true;
    }

    // work through input in the correct order!

    // title

    if(inputSettings.includes("pageTitle")){
      let block = await getTitleOfCurrentPage()
      shortcutInputBlocks.push(block);
      if(separatorNeeded){
          shortcutInputBlocks.push(craftcut.getInputSeparator())
      }
    }


    // selection
    if(inputSettings.includes("selection")){
      let selectedBlocks = await getSelectedBlocksAsMdStingsFromCurrentPage()
      if(selectedBlocks){
        shortcutInputBlocks = shortcutInputBlocks.concat(selectedBlocks)
      }
      if(separatorNeeded){
          shortcutInputBlocks.push(craftcut.getInputSeparator())
      }
    }

    //openTasks

    if(inputSettings.includes("openTasks")){
      let blocks = await getUncheckedTodoItemsFromCurrentPage()
      if(blocks){
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if(separatorNeeded){
          shortcutInputBlocks.push(craftcut.getInputSeparator())
      }
    }

    //doneTasks

    if(inputSettings.includes("doneTasks")){
      let blocks = await getCheckedTodoItemsFromCurrentPage()
      if(blocks){
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if(separatorNeeded){
          shortcutInputBlocks.push(craftcut.getInputSeparator())
      }
    }


    //all Urls
    if(inputSettings.includes("allUrls")){
      let blocks = await getAllUrlsFromCurrentPage()
      if(blocks){
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if(separatorNeeded){
          shortcutInputBlocks.push(craftcut.getInputSeparator())
      }
      //prevent open url if this is enabled
      openUrlOnSuccess = false;
    }

    //allBlocks
    if(inputSettings.includes("allBlocks")){
      let blocks = await getAllBlocksFromCurrentPage()
      if(blocks){
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if(separatorNeeded){
          shortcutInputBlocks.push(craftcut.getInputSeparator())
      }

      // reenable open url if it is disabled
      if(!openUrlOnSuccess){
        openUrlOnSuccess = true;
      }
    }

    // cancelAndMoveTasks
    if(inputSettings.includes("cancelAndMoveTasks")){

      let blocks = await getAndCancelUncheckedTodoItemsFromCurrentPage()
      if(blocks){
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if(separatorNeeded){
          shortcutInputBlocks.push(craftcut.getInputSeparator())
      }

      // reenable open url if it is disabled
      if(!openUrlOnSuccess){
        openUrlOnSuccess = true;
      }
    }

    // cancelAndMoveTasks
    if(inputSettings.includes("deleteAndMoveTasks")){

      let blocks = await getAndDeleteUncheckedTodoItemsFromCurrentPage()
      if(blocks){
        shortcutInputBlocks = shortcutInputBlocks.concat(blocks)
      }
      if(separatorNeeded){
          shortcutInputBlocks.push(craftcut.getInputSeparator())
      }

      // reenable open url if it is disabled
      if(!openUrlOnSuccess){
        openUrlOnSuccess = true;
      }
    }

    // remove last separator if it was included
    if(separatorNeeded){
        shortcutInputBlocks.pop();
    }

    const combinedBlocks = shortcutInputBlocks.join("\n");
    const input = encodeURIComponent(combinedBlocks);


    // now assemble the url
    let xCallbackUrl = "shortcuts://x-callback-url/run-shortcut?name=" + encodeURIComponent(craftcut.getExactName());

    if (shortcutInputBlocks.length > 0){
      xCallbackUrl = xCallbackUrl + "&input=text&text=" + input;

      if(openUrlOnSuccess){
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

    let foundObj = craftcutsObjects.filter(obj => obj == scToEdit)
    toast({
      id: "addedToast",
      position: "bottom",
      duration: 2000,
      title: "edit:" + foundObj[0].getDisplayName()
    })

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

    if (inputDoneTasks != ""){
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

    if(inputCancelAndMoveTasks != ""){
      if(inputSettings.length > 1){
        // invlalidate the configuration - currently just supported as single import
        isValid = false;
        errorString = "not supported with several inputs"
      }
      inputSettings.push(inputCancelAndMoveTasks)
    }

    if(inputDeleteAndMoveTasks != ""){
      if(inputSettings.length > 1){
        // invlalidate the configuration - currently just supported as single import
        isValid = false;
        errorString = "not supported with several inputs"
      }
      inputSettings.push(inputDeleteAndMoveTasks)
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
        title: "not edited"
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
        title: "edited"
      })
      // reset input fields
      setExactName("");
      setDisplayName("");
      setInputSeparator("");
      updateShortcutsData();
    }

    setIsLoadingEdit(false);




  }

  return (
    <>
  <Stack spacing='2px' direction={['column']}>
  {
    craftcutsObjects.map((element) => (
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
        <IconButton aria-label='Edit Configuration' icon={<EditIcon/>} colorScheme='purple' isLoading={isLoadingEdit} onClick={() => handleShowEdit(element)}/>
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
                <CheckboxGroup colorScheme='purple' defaultValue={inputVals}> Shortcut Input
              <FormHelperText>Select the input which shall be provided to the Shortcut (all with links to the original block(s))</FormHelperText>
                  <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox value='pageTitle' onChange={(e) => setInputPageTitle(e.target.checked ? "pageTitle" : "")}>page title</Checkbox>
                    <Checkbox value='selection'  onChange={(e) => setInputSelection(e.target.checked ? "selection" : "")}>selected blocks</Checkbox>
                    <Checkbox value='openTasks'  onChange={(e) => setInputOpenTasks(e.target.checked ? "openTasks" : "")}>open tasks</Checkbox>
                    <Checkbox value='doneTasks'  onChange={(e) => setInputDoneTasks(e.target.checked ? "doneTasks" : "")}>done tasks</Checkbox>
                    <Checkbox value='allUrls'  onChange={(e) => setInputAllUrls(e.target.checked ? "allUrls" : "")}>url blocks</Checkbox>
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
            <Button colorScheme='green' mr={3} onClick={onEdit} isLoading={isLoadingEdit}>
              Add Shortcut
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </>
)
}

export default Craftcuts;

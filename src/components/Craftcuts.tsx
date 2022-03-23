import React from "react";
import { Button } from "@chakra-ui/button";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import { Craftcut, craftcutsObjects} from "../settingsUtils";
import { getAllBlocksFromCurrentPage, getAllUrlsFromCurrentPage, getAndCancelUncheckedTodoItemsFromCurrentPage, getCheckedTodoItemsFromCurrentPage, getSelectedBlocksAsMdStingsFromCurrentPage, getTitleOfCurrentPage, getUncheckedTodoItemsFromCurrentPage } from "../craftBlockInteractor";

const Craftcuts: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

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

  return (
    <>
  <Stack spacing='2px' direction={['column']}>
  {
    craftcutsObjects.map((element) => (
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
    ))
  }
</Stack>
  </>
)
}

export default Craftcuts;

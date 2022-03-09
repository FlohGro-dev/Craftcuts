import React from "react";
import { Button } from "@chakra-ui/button";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import { craftcutsMapArr} from "../settingsUtils";
import { getSelectedBlocksAsMdStingsFromCurrentPage } from "../craftBlockInteractor";

const Craftcuts: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const onClick = async (val:string|undefined) => {
    setIsLoading(true);
    let input = "";
    let callbackBlock:string|undefined = undefined;
    let selectedBlocks = await getSelectedBlocksAsMdStingsFromCurrentPage()

    if(selectedBlocks){
      if(selectedBlocks.length > 0){
        // a selection was returned we will use it as input for the shortcut
        // therefore combine the array - each selected block will be handed over as md deeplink
        const combinedBlocks = selectedBlocks.join("\n");
        input = encodeURIComponent(combinedBlocks);

        callbackBlock = selectedBlocks[0];
        const regex = /\[(.*)\]\((.*)\)/;
        const subst = `$2`;
        callbackBlock = callbackBlock.replace(regex, subst);
      }
    }

    // now assemble the url
    // val is the shortcut name
    let xCallbackUrl = "shortcuts://x-callback-url/run-shortcut?name=" + val;
    if(selectedBlocks){
      // add input if blocks where selected
      xCallbackUrl = xCallbackUrl + "&input=text&text=" + input;

      // also add the x-success url to open the first block after the shortcut was executed
      xCallbackUrl = xCallbackUrl + "&x-success=" + callbackBlock
    }

    craft.editorApi.openURL(xCallbackUrl);

    setIsLoading(false);
  }
  return (
    <>
    <Stack spacing='2px' direction={['column']}>
    {
      craftcutsMapArr.map((element) => (
        <Button
          key={element[0]}
          rightIcon={<ExternalLinkIcon />}
          colorScheme='purple'
          onClick={() => onClick(element[1])}
          width="100%"
          isLoading={isLoading}
        >
          {element[0]}
          </Button>
      ))
    }
  </Stack>
  </>
)
}

export default Craftcuts;

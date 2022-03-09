
export async function getSelectedBlocksAsMdStingsFromCurrentPage():Promise<string[] | undefined>{
  let getSelectionResult = await craft.editorApi.getSelection();
  let selectedBlocksMdStrings:string[] = [];

  if(getSelectionResult.status == "success"){
    const selectedBlocks = getSelectionResult.data;

    selectedBlocks
      .map((block) => {
        if(block.type == "textBlock"){
          const blockText = block.content.map((c) => c.text).join("");
          const blockMdString = "[" + blockText + "](craftdocs://open?blockId=" + block.id + "&spaceId=" + block.spaceId + ")"
          selectedBlocksMdStrings.push(blockMdString);
        } else if(block.type == "urlBlock"){
          const blockText = "[" + block.title + "](" + block.url + ")";
          const blockMdString = "[" + blockText + "](craftdocs://open?blockId=" + block.id + "&spaceId=" + block.spaceId + ")"
          selectedBlocksMdStrings.push(blockMdString);
        }
      })

    return selectedBlocksMdStrings;

  } else {
    return undefined;
  }
}

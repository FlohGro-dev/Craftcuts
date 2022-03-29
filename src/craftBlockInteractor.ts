import { CraftBlockUpdate, CraftTextBlock, CraftUrlBlock } from "@craftdocs/craft-extension-api";

export async function getSelectedBlocksAsMdStingsFromCurrentPage(): Promise<string[] | undefined> {
  let getSelectionResult = await craft.editorApi.getSelection();
  let selectedBlocksMdStrings: string[] = [];

  if (getSelectionResult.status == "success") {
    const selectedBlocks = getSelectionResult.data;

    selectedBlocks
      .map((block) => {
        if (block.type == "textBlock") {
          selectedBlocksMdStrings.push(getCraftTextBlockMdString(block));
        } else if (block.type == "urlBlock") {
          selectedBlocksMdStrings.push(getCraftUrlBlockMdString(block));
        }
      })

    return selectedBlocksMdStrings;

  } else {
    return undefined;
  }
}

export async function getUncheckedTodoItemsFromCurrentPage() {
  let todoBlocks: CraftTextBlock[] = [];
  let blocksMdStrings: string[] = [];

  const getPageResult = await craft.dataApi.getCurrentPage();

  if (getPageResult.status !== "success") {
    throw new Error(getPageResult.message)
  }
  const pageBlock = getPageResult.data

  pageBlock.subblocks.forEach(function(subBlock) {
    if (subBlock.listStyle.type == "todo") {
      if (subBlock.listStyle.state == "unchecked") {
        if (subBlock.type == "textBlock") {
          todoBlocks.push(subBlock);
        }
      }
    }

  })

  todoBlocks.map((block) => {
    blocksMdStrings.push(getCraftTextBlockMdString(block))
  })

  return blocksMdStrings;
}

export async function getCheckedTodoItemsFromCurrentPage(){
  let doneBlocks: CraftTextBlock[] = [];
  let blocksMdStrings: string[] = [];

  const getPageResult = await craft.dataApi.getCurrentPage();

  if (getPageResult.status !== "success") {
    throw new Error(getPageResult.message)
  }
  const pageBlock = getPageResult.data

  pageBlock.subblocks.forEach(function(subBlock) {
    if (subBlock.listStyle.type == "todo") {
      if (subBlock.listStyle.state == "checked") {
        if (subBlock.type == "textBlock") {
          doneBlocks.push(subBlock);
        }
      }
    }

  })

  doneBlocks.map((block) => {
    blocksMdStrings.push(getCraftTextBlockMdString(block))
  })

  return blocksMdStrings;
}

export async function getAllBlocksFromCurrentPage() {
  let blockMdStrings: string[] = [];

  const getPageResult = await craft.dataApi.getCurrentPage();

  if (getPageResult.status !== "success") {
    throw new Error(getPageResult.message)
  }
  const pageBlock = getPageResult.data

  pageBlock.subblocks.forEach(function(subBlock) {
    if (subBlock.type == "textBlock") {
      blockMdStrings.push(getCraftTextBlockMdString(subBlock));
    } else if (subBlock.type == "urlBlock") {
      blockMdStrings.push(getCraftUrlBlockMdString(subBlock));
    }
  })
  return blockMdStrings;
}

export async function getTitleOfCurrentPage() {
  // get page for document linking
  const getPageResult = await craft.dataApi.getCurrentPage();

  if (getPageResult.status !== "success") {
    throw new Error(getPageResult.message)
  }

  const pageBlock = getPageResult.data
  return getCraftTextBlockMdString(pageBlock);
}

export async function getAllUrlsFromCurrentPage() {
  let urlBlocks: CraftUrlBlock[] = [];
  let blocksMdStrings: string[] = [];

  const getPageResult = await craft.dataApi.getCurrentPage();

  if (getPageResult.status !== "success") {
    throw new Error(getPageResult.message)
  }
  const pageBlock = getPageResult.data

  pageBlock.subblocks.forEach(function(subBlock) {
    if (subBlock.type == "urlBlock") {
      urlBlocks.push(subBlock);
    }
  })

  urlBlocks.map((block) => {
    blocksMdStrings.push(getCraftUrlBlockMdString(block))
  })

  return blocksMdStrings;
}


export async function getAndCancelUncheckedTodoItemsFromCurrentPage() {
  let todoTextBlocks: CraftTextBlock[] = [];
  let todoUrlBlocks: CraftUrlBlock[] = [];
  let blocksMdStrings: string[] = [];
  let blocksToUpdate: CraftBlockUpdate[] = [];

  const getPageResult = await craft.dataApi.getCurrentPage();

  if (getPageResult.status !== "success") {
    throw new Error(getPageResult.message)
  }
  const pageBlock = getPageResult.data

  pageBlock.subblocks.forEach(function(subBlock) {
    if (subBlock.listStyle.type == "todo") {
      if (subBlock.listStyle.state == "unchecked") {
        if (subBlock.type == "textBlock") {
          todoTextBlocks.push(subBlock);
          subBlock.listStyle.state = "canceled";
          blocksToUpdate.push(subBlock)
        }else if (subBlock.type == "urlBlock"){
          todoUrlBlocks.push(subBlock);
          subBlock.listStyle.state = "canceled";
          blocksToUpdate.push(subBlock)
        }
      }
    }

  })

  todoTextBlocks.map((block) => {
    blocksMdStrings.push(getCraftTextBlockMdString(block))
  })
  todoUrlBlocks.map((block) => {
    blocksMdStrings.push(getCraftUrlBlockMdString(block, true))
  })

  craft.dataApi.updateBlocks(blocksToUpdate);

  return blocksMdStrings;
}

export async function getAndDeleteUncheckedTodoItemsFromCurrentPage() {
  let todoTextBlocks: CraftTextBlock[] = [];
  let todoUrlBlocks: CraftUrlBlock[] = [];
  let blocksMdStrings: string[] = [];
  let blocksToDelete: string[] = [];

  const getPageResult = await craft.dataApi.getCurrentPage();

  if (getPageResult.status !== "success") {
    throw new Error(getPageResult.message)
  }
  const pageBlock = getPageResult.data

  pageBlock.subblocks.forEach(function(subBlock) {
    if (subBlock.listStyle.type == "todo") {
      if (subBlock.listStyle.state == "unchecked") {
        if (subBlock.type == "textBlock") {
          todoTextBlocks.push(subBlock);
          blocksToDelete.push(subBlock.id)
        } else if (subBlock.type == "urlBlock"){
          todoUrlBlocks.push(subBlock);
          blocksToDelete.push(subBlock.id)
        }
      }
    }

  })

  todoTextBlocks.map((block) => {
    blocksMdStrings.push(getCraftTextBlockMdString(block))
  })
  todoUrlBlocks.map((block) => {
    blocksMdStrings.push(getCraftUrlBlockMdString(block, true))
  })

  craft.dataApi.deleteBlocks(blocksToDelete);

  return blocksMdStrings;
}


// helper functions


function getCraftTextBlockMdString(block: CraftTextBlock) {
  let blockTexts:string[] = [];
  block.content.map((c) => {
    if(c.link){
      // determine which link
      switch (c.link.type){
        case "blockLink":
          blockTexts.push("["+c.text+"]"+"("+createOpenCraftBlockUrl(c.link.blockId,c.link.spaceId)+")");
          break;
        case "dateLink":
          blockTexts.push(createDateLink(c.link.date));
          break;
        case "formula":
          // ignore formula, just use text
          blockTexts.push(c.text)
        break;
        case "url":
          blockTexts.push("["+c.text+"]"+"("+c.link.url+")")
        break;
      }
    } else {
      blockTexts.push(c.text);
    }
  })
  const blockMdString = "[" + blockTexts.join("") + "](craftdocs://open?blockId=" + block.id + "&spaceId=" + block.spaceId + ")"
  return blockMdString;
}

function getCraftUrlBlockMdString(block: CraftUrlBlock, keepMarkdownUrlAsContent:boolean = false) {
  const blockText = "[" + block.title + "](" + block.url + ")";
  if(keepMarkdownUrlAsContent){
    return "[" + blockText + "](craftdocs://open?blockId=" + block.id + "&spaceId=" + block.spaceId + ")";
  } else {
    return blockText;
  }
}

function createOpenCraftBlockUrl(blockId:string,spaceId:string){
  return "craftdocs://open?blockId=" + blockId + "&spaceId="+spaceId
}

function createDateLink(date:string){
  return "[" + date + "](day://" + date + ")"
}

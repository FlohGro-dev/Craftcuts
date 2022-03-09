import { initApp } from "./app";

export let craftcutsMap = new Map<string,string>();
export let craftcutsMapArr = Array.from(craftcutsMap.entries());

export let isInitialized = false;

export function updateShortcutsData(){
  craftcutsMapArr = Array.from(craftcutsMap.entries());
  initApp()
  storeShortcutsData();
}

const craftCutDivider = "/|/|/|/"

export async function storeShortcutsData(){
  let data = ""
  craftcutsMap.forEach((craftcutVal,craftcutKey) => {
    data = data + craftcutKey + craftCutDivider + craftcutVal + "\n"
  })
  await craft.storageApi.put("craftcutsData", data);
  console.log("stored data: " + data)
}

export async function loadShortcutData(){
  let storedData = await craft.storageApi.get("craftcutsData");

  if (storedData.status == "success"){
    const data = storedData.data
    // parse Data

    const craftcuts = data.split("\n")
    craftcuts.pop()

    craftcuts.map((craftcut) => {
      let keyValPair = craftcut.split(craftCutDivider);
      craftcutsMap.set(keyValPair[0],keyValPair[1]);
    })
    console.log("loaded data: " + data)
    updateShortcutsData()
    console.log("updated updateShortcutsData()")
    isInitialized = true;
    initApp()
  }
}

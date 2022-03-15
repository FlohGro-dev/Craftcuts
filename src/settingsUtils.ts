import { initApp } from "./app";

export let isInitialized = false;

export function updateShortcutsData(){
  initApp()
  storeShortcutsData();
}

export async function storeShortcutsData(){
  await craft.storageApi.put("craftcutsSet", JSON.stringify(craftcutsObjects));
}

export async function loadShortcutData(){
  let storedSet = await craft.storageApi.get("craftcutsSet");
    if(storedSet.status == "success"){


      let t = storedSet.data
      let parsed = JSON.parse(t)

      Object.entries(parsed).forEach((obj) => {

        let str = JSON.stringify(obj[1]);
        let craftcut = Craftcut.fromJSON(JSON.parse(str, Craftcut.reviver));
        craftcutsObjects.push(craftcut)
      }
      )

      updateShortcutsData()

      isInitialized = true;
      initApp()
    }
}

export class Craftcut {

  constructor(
    private exactName: string,
    private displayName: string,
    private inputSettings: string[],
    private inputSeparator: string
  ){}

  getExactName(): string {
    return this.exactName;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  getInputSettings(): string[] {
    return this.inputSettings;
  }

  getInputSeparator(): string {
    return this.inputSeparator;
  }

  toJSON(): Craftcut {
    return Object.assign({},this,{});
  }

  static fromJSON(json: Craftcut|string): Craftcut {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Craftcut.reviver);
    } else {
      // create an instance of the User class
      let craftcut = Object.create(Craftcut.prototype);
      // copy all the fields from the json object
      return Object.assign(craftcut, json, {});
    }
  }

  static reviver(key: string, value: any): any {
    return key === "" ? Craftcut.fromJSON(value) : value;
  }

}


export let craftcutsSet = new Set<Craftcut>();
export let craftcutsObjects:Craftcut[] = [];

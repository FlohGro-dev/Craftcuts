# Craftcuts

Welcome to the repository of Craftcuts my Shortcuts eXtension for Craft.
Please read through the instructions, especially the [installation](#installation) chapter.
Also make sure to check out the latest changes in the [changelog](#changelog) which will contain the latest feature updates.

There are a lot Shortcuts available which are specifically made for the use with Craftcuts which you can see in [Shortcuts Made for Craftcuts](#shortcuts-made-for-craftcuts).

To create your own Shortcut to use with Craftcuts check out the [Template Shortcuts](#template-shortcuts).

If you want to follow me for updates or get in touch you can follow me on [Twitter](https://twitter.com/FlohGro) or choose anything else to contact on my [website](https://flohgro.com/contactme/). Feel free to create issues in the repository for bugs you notice or features you'd like to see.

If this eXtension is valuable for and you like to thank me you can

<a href="https://www.buymeacoffee.com/flohgro" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 220px !important;" ></a>

If you want to have a look to other things I'm working, check out my website at [flohgro.com](https://flohgro.com).

## Installation

You can simply download the `.craftx` file from the Assets of the latest Release [here](https://github.com/FlohGro-dev/Craftcuts/releases/tag/0.3.2) and add it to your eXtensions in Craft on macOS.

If you want to built the eXtension by yourself (and e.g. make some custom modifications) use the instructions given by the people at Craft:

Simply run `npm install` and than `npm run build` to generate the .craftx file which can be installed.

To learn more about Craft eXtensions visit the [Craft X developer portal](https://developer.craft.do).

## Features

Craftcuts enables Craft to run your Shortcuts from  within Craft.

Theoretically this enables endless possibilities for you to export your contents from Craft documents (or just turn on your lights or start playing music from Craft).

Craftcuts uses Apples official URL scheme for Shortcuts.

After installing Craftcuts the first time (or updating it to a new version) you'll see only two buttons "Add Shortcut" and "Remove Shortcut".
To add a Shortcuts click on the "Add Shortcut" button which will open the configuration window for your Shortcut.
You have to provide the following inputs to configure a Shortcut:

- Shortcut Name (required): insert the **exact** name of the Shortcut, otherwise it will not work and you'll get an error in the Shortcuts app.
- Display Name (required): this will be the name of the button in the eXtension to run this Shortcut
- Shortcut Input (recommended):
  - in theory you could run a shortcut without any input from your document (if you want to turn on lights from Craft - this is totally possible:))
  - to provide blocks from the current document as input select one or more of the available options:
    - page title - this will pass the markdown deeplink to the current page to your Shortcut
    - selected blocks - this will pass the markdown deeplink to all currently selected blocks to your Shortcut
    - open tasks - this will pass the markdown deeplink of all open tasks in the current document to your Shortcut
    - url blocks - this will pass all url blocks (the ones with the preview) in markdown format from the current document to your Shortcut
    - all blocks - this will pass the markdown deeplinks to all blocks on the current page to your Shortcut
- Separator (required if more than one input option is selected): select a separator between the inputs passed to your Shortcut - attention: please use a string which you would never use in the text of a block like e.g. "///&&&///". Use the same separator in your shortcut to separate the inputs from each other.

When you finished your configuration click on the "Add Shortcut" button in the lower right of the window. You will see a success message and a new button will be created in your Craftcuts eXtension.

If you want to remove a shortcut just click the "Remove Shortcut" button which will open a menu with all currently activated Shortcuts. When you select one of them it will be removed from Craftcuts.

In theory thats all you need todo - when you click the newly created button Craftcuts will launch the Shortcut you provided.

After the Shortcut was successfully executed Craft will be opened again.

This gets really powerful when you make use of the values passed to the Shortcut.

Depending on your configuration the launched Shortcut will receive the markdown deeplinks to e.g. the selected blocks or all tasks in the current document as text input.

An example input to the Shortcut could look like this:

```markdown
[reminder 1](craftdocs://open?blockId=E151E8DE-B3C3-44D5-802D-E18AB328A0E9&spaceId=2579f404-e3cd-4s7n-gfe1-6c342199c9g2)
[reminder 2](craftdocs://open?blockId=BF3FA431-BD47-466A-8DF7-C7A6725975AB&spaceId=2579f404-e3cd-4s7n-gfe1-6c342199c9g2)
[reminder 3](craftdocs://open?blockId=3DEDFD80-6902-4460-8062-20F1CD273B7E&spaceId=2579f404-e3cd-4s7n-gfe1-6c342199c9g2)
```
The input can be used to do anything you like. You can e.g. add each block to Apples Reminders app with links back to the original blocks in Craft, or export just the content to your favorite writing app.

## Template Shortcuts

To help you develop your own shortcut and make use of the passed content I created two Template Shortcuts to support you develop your own SHortcut for Craftcuts.
- [Template for use with Single Input](https://www.icloud.com/shortcuts/3f9715ecb5784e1caeea9d538d0798a1)
- [Template for use with Multiple Input](https://www.icloud.com/shortcuts/67290191f1ac4741b864f8f07672a0f4)
- [Template to add text content to the current page](https://www.icloud.com/shortcuts/aaf323bbecfe44aaaa68bae257df7bb4)

These Template parse the provided markdown deeplinks of the blocks into the content and the deeplink.

## Shorcuts Made for Craftcuts

I want to provide as many Craftcuts as possible in this repository in the table below. If you created a Shortcut which can be used with Craftcuts just reach out to me with a description and the link to the Shortcut so I can add it here.

| Name | Description | Creator | Usecase / Additional Information | Download |
|---|---|---|---|---|
| Craftcuts Template | Template Shortcut to use with Craftcuts | [@FlohGro](https://twitter.com/FlohGro) | Template to create your own Shortcuts to work with Craftcuts | [Download](https://www.icloud.com/shortcuts/3f9715ecb5784e1caeea9d538d0798a1) |
| Craftcuts Reminders  | Creates Reminders based on the provided blocks | [@FlohGro](https://twitter.com/FlohGro) | create reminders from provided blocks | [Download](https://www.icloud.com/shortcuts/4bdb51a8abe94061a6c221c87a720954) |
| Craftcuts Random 2 Daily Note | Adds a Random Block of the provided blocks to your Daily Note | [/u/iBanks3](https://www.reddit.com/user/iBanks3/) |  | [Download](https://www.icloud.com/shortcuts/639cffe2f48643e68b34aa868bd334aa) |
| Craftcuts Open Urls | Open Urls from selected blocks in Safari | [/u/iBanks3](https://www.reddit.com/user/iBanks3/) & [@FlohGro](https://twitter.com/FlohGro) | [Post on /r/CraftDocs](https://www.reddit.com/r/CraftDocs/comments/tezljn/safari_tabs_to_craft_copy_open_links_from_safari/) | [Download](https://www.icloud.com/shortcuts/ce7d64df29104f4b8b0273c7ec5ef767) |
| Craft Task Reminders | Create Tasks in Reminders with dates (if provided block contains a link to a daily note) | [/u/iBanks3](https://www.reddit.com/user/iBanks3/) | [Post on /r/CraftDocs](https://www.reddit.com/r/CraftDocs/comments/tezoar/craft_task_reminder_get_your_tasks_from_craft/) | [Download](https://www.icloud.com/shortcuts/5f9b34583aba4b5cb3cd8c9ae627eb0d) |
| Craftcuts Import Calendar Events | import configurable events into the current document | [@FlohGro](https://twitter.com/FlohGro) | [Youtube Demo](https://www.youtube.com/watch?v=Fkmp0aNJxIo) |[Download](https://www.icloud.com/shortcuts/089f9a7061ca4fefa7a924a1f4b125fe)|
| Craftcuts Import Current Weather Forecast | import current weather forecast into the current document | [@FlohGro](https://twitter.com/FlohGro) | [Youtube Demo](https://www.youtube.com/watch?v=Fkmp0aNJxIo) |[Download](https://www.icloud.com/shortcuts/c2994e27ae174cf087b6f971fcfc91ac)|
| Craftcuts Tasks to Tomorrow | move tasks to tomorrows daily note | [@FlohGro](https://twitter.com/FlohGro) | You can use this shortcut to move tasks from the todays note to tomorrows note | [Download](https://www.icloud.com/shortcuts/a07520bdfe884246964532615361404b) |

I plan to add more features and configuration options to this eXtension in the future to pass more / different content to the triggered shortcuts. If you have ideas or use cases which are not yet supported just create a new issue in the repository or reach out to me on the platform of your choice: [contactme](https://flohgro.com/contactme/).

## Changelog

### v0.3.2 refinements for task moving feature

- **new:** added support for tasks as URL blocks
- **fixed:** loosing urls in task contents (now supporting urls, date links and block links)

### v0.3.1 option to delete open tasks in document

- **new:** input option *delete and move tasks* - this will delete any open task in your current document and provide them as input to the shortcut
  - attention this is a destructive action! if you don't add those tasks to another document, they will be lost
  - you can use this to move tasks from the todays note to tomorrows note with [this Shortcut](https://www.icloud.com/shortcuts/a07520bdfe884246964532615361404b)

### v0.3 additional inputs with block changes

- **new:** input option *cancel and move tasks* - this will cancel any open task in your current document and provide them as input to the shortcut (you can use this to move tasks from the todays note to tomorrows note with [this Shortcut](https://www.icloud.com/shortcuts/a07520bdfe884246964532615361404b))
- **new:** input option *done tasks* - will provide all done tasks from a document to the Shortcut
- **updated:** multiple input template supports *done tasks* input - download [here](https://www.icloud.com/shortcuts/67290191f1ac4741b864f8f07672a0f4)

### v0.2 a lot more settings and Shortcut input options

- **new:** configuration menu for added Shortcuts
- **new:** selecting a display name for the Shortcut is now possible
- **new:** configuration options to select the inputs provided to the Shortcut:
  - page title
  - selected blocks
  - open tasks
  - url blocks
  - all blocks
- **change:** URL Blocks will now be exported as markdown urls and not include a link to the original block in Craft since this makes more sense

### v0.1 initial release

- **new** RUN Shortcuts from Craft

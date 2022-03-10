# Craftcuts

Welcome to the repository of Craftcuts my Shortcuts eXtension for Craft.
Please read through the instructions, especially the [installation](#installation) chapter.
Also make sure to check out the latest changes in the [changelog](#changelog) which will contain the latest feature updates

If you want to follow me for updates or get in touch you can follow me on [Twitter](https://twitter.com/FlohGro) or choose anything else to contact on my [website](https://flohgro.com/contactme/). Feel free to create issues in the repository for bugs you notice or features you'd like to see.

If this eXtension is valuable for and you like to thank me you can

<a href="https://www.buymeacoffee.com/flohgro" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 220px !important;" ></a>

If you want to have a look to other things I'm working, check out my website at [flohgro.com](https://flohgro.com).

## Installation

You can simply download the `.craftx` file from the Assets of the latest Release [here](https://github.com/FlohGro-dev/Craftcuts/releases) and add it to your eXtensions in Craft on macOS.

If you want to built the eXtension by yourself (and e.g. make some custom modifications) use the instructions given by the people at Craft:

Simply run `npm install` and than `npm run build` to generate the .craftx file which can be installed.

To learn more about Craft eXtensions visit the [Craft X developer portal](https://developer.craft.do).

## Features

Craftcuts enables Craft to run your Shortcuts from  within Craft.

Theoretically this enables endless possibilities for you to export your contents from Craft documents (or just turn on your lights or start playing music from Craft).

Craftcuts uses Apples official URL scheme for Shortcuts.

After installing Craftcuts the first time (or updating it to a new version) you'll see a text field and two buttons.
To add your Shortcuts you have to type in the exact name of the Shortcut you want to launch from Craft into the text field and then click the "Add Shortcut" button.
If you want to remove a shortcut just click the "Remove Shortcut" button which will open a menu with all currently activated Shortcuts. When you select one of them it will be removed from Craftcuts.

This will create a new button in the "RUN" section of the eXtension with the name of your Shortcut.

**Attention:** ensure to use the exact name of the Shortcut, otherwise it will not work and you'll get an error in the Shortcuts app.

In theory thats all you need todo - when you click the newly created button Craftcuts will launch the Shortcut you provided.

After the Shortcut was successfully executed Craft will be opened again.

This gets really powerful when you make use of the values passed to the Shortcut.

When you select one or more blocks in Craft the launched Shortcut will receive the markdown deeplinks to the selected blocks as text input.

An example input to the Shortcut could look like this when you selected three blocks:

```markdown
[reminder 1](craftdocs://open?blockId=E151E8DE-B3C3-44D5-802D-E18AB328A0E9&spaceId=2579f404-e3cd-4s7n-gfe1-6c342199c9g2)
[reminder 2](craftdocs://open?blockId=BF3FA431-BD47-466A-8DF7-C7A6725975AB&spaceId=2579f404-e3cd-4s7n-gfe1-6c342199c9g2)
[reminder 3](craftdocs://open?blockId=3DEDFD80-6902-4460-8062-20F1CD273B7E&spaceId=2579f404-e3cd-4s7n-gfe1-6c342199c9g2)
```
The input can be used to do anything you like. You can e.g. add each block to Apples Reminders app with links back to the original blocks in Craft, or export just the content to your favorite writing app.

To help you develop your own shortcut and make use of the passed content I created a Template Shortcut which you can get [here](https://www.icloud.com/shortcuts/3f9715ecb5784e1caeea9d538d0798a1).
This Template parses the provided content into the block content and the block deeplink.

I want to provide as many Craftcuts as possible in this repository in the table below. If you created a Shortcut which can be used with Craftcuts just reach out to me with a description and the link to the Shortcut so I can add it here.

| Name | Description | Creator | Download |
|---|---|---|---|
| Craftcuts Template | Template Shortcut to use with Craftcuts | [@FlohGro](https://twitter.com/FlohGro) | [Download](https://www.icloud.com/shortcuts/3f9715ecb5784e1caeea9d538d0798a1) |
| Craftcuts Reminders  | Creates Reminders based on the provided blocks | [@FlohGro](https://twitter.com/FlohGro) | [Download](https://www.icloud.com/shortcuts/4bdb51a8abe94061a6c221c87a720954) |
| Craftcuts Random 2 Daily Note | Adds a Random Block of the provided blocks to your Daily Note | iBanks | [Download](https://www.icloud.com/shortcuts/639cffe2f48643e68b34aa868bd334aa) |

I plan to add more features and configuration options to this eXtension in the future to pass more / different content to the triggered shortcuts. If you have ideas or use cases which are not yet supported just create a new issue in the repository or reach out to me on the platform of your choice: [contactme](https://flohgro.com/contactme/).

## Changelog

### v0.1 initial release

- **new** RUN Shortcuts from Craft

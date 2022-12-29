# SaiDa - Discord Bot

> SaiDa discord bot is a template for making discord bots using Typescript, Node.js and discord.js.
>
> This is originally used for the discord bot SaiDa.

## Table of Contents

-   [SaiDa - Discord Bot](#saida---discord-bot)
    -   [Table of contents](#table-of-contents)
    -   [Overview](#overview)
    -   [Features](#features)
    -   [Demo](#demo)
    -   [Tech Stack](#tech-stack)
        -   [Built with](#built-with)
    -   [Initial Requirements](#initial-requirements)
    -   [Environment Variables](#environment-variables)
    -   [Run Locally and Setup](#run-locally-and-setup)
    -   [Roadmap](#roadmap)
    -   [Author](#author)
    -   [Acknowledgments](#acknowledgments)
        -   [Useful resources](#useful-resources)
    -   [License](#license)

## Overview

This template follows the guide in creating discord bots using [discord.js](https://discordjs.guide/#before-you-begin).

The repository comes with a `src/` folder with the SaiDa template for discord bot built with TypeScript  
and a `bin` folder with our custom cli for creating templates.

## Features

-   TypeScript and Node.js
-   Discord.js implementation
-   Custom CLI

## Demo

To be followed

## Tech Stack

**Discord Bot:** Node, TypeScript, Discord.js
**CLI:** Commander, Inquirer, EJS

### Built With

-   Node.js
-   Typescript
-   Commander and Inquirer
-   EJS

## Initial Requirements

1. Node.js (version 16, 18 or higher) & Npm (version 8 or higher)  
   -- refer here for installation: [nodejs.org](https://nodejs.org/en/download/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Use `.sample.env` file for your reference.

---

`DISCORD_TOKEN` = Get this token from the developer portal. Read more from the [discord.js guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#what-is-a-token-anyway).

`DISCORD_CLIENT_ID` = Your discord bot Application ID from the [developer portal](https://discord.com/developers/applications).

`CLIENT_SECRET` = Your discord bot client secret

`SERVER_ID` = Single server id to attach your bot

---

## Run Locally and Setup

1. Clone the project

```bash
  git clone git@github.com:almoratalla/SaiDa-DiscordBot.git
```

2. Go to the project directory

```bash
  cd SaiDa-DiscordBot
```

3. Install dependencies

```bash
  npm install
```

4. Create an `.env` file in the root of the project using the format from `.sample.env`.  
   Please refer to: [Set up environment variables](#environment-variables).

5. Deployment instructions

-   For Development :

```bash
  npm run dev
```

-   For Production

```bash
  npm start
```

6. For CLI

-   To Install the CLI

```bash
  npm install -g
```

-   To run the CLI

```bash
  sd <command> <schematic> | e.g.: sd create command
```

-   To run the CLI using npm script

```bash
  npm run sd
```

## Bot Documentation

See [SaiDa - Discord Bot documentation](./Documentation.md)

## Author

-   [Alain Moratalla](https://www.github.com/almoratalla)

## Acknowledgements

This project is heavily inspired from the documentations on discord.js. Acknowledgments and resources will be followed after collection of resources.
Furthermore, the etymology of the term SaiDa comes from the pairing of TWICE members Sana and Dahyun. The word came from the korean word of soda or cider which is claimed to be refreshing.

### Useful Resources

-   To Be Followed

## License

SaiDa - Discord Bot is [MIT licensed](./LICENSE)

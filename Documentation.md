# SaiDa Discord Bot Documentation

## These are in initial works and are mainly for scratch

1. Setup a [bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
2. Create a new client

3. List intents

-   Guilds
-   GuildsMessages
-   MessageContent

References:
https://discordjs.guide/#before-you-begin

Specs:

-   discord.js v14
-   Node v16.9.0 or higher

Discord Intents
https://discord.com/developers/docs/topics/gateway#gateway-intents

GUILDS - Guilds in Discord represent an isolated collection of users and channels, and are often referred to as "servers" in the UI

https://discord.com/developers/docs/resources/guild

# bin

npm i chalk chalk-animation figlet gradient-string inquirer nanospinner

sd create command

####

sd create command

commands/create.js
schema/command.js

sd <command> <schematics>

Use case:

1. sd

-   output: display help and commands
-   ask command
-   check command if no command ask command, else proceed with command

2. sd <command>

-   checks for schematics, if no schematics ask, else proceed with schematics

3. sd <command> <schematics>

-   checks for name, if no name ask

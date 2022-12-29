import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest";
import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { Command, SlashCommand } from "../types/index.js";
import { DISCORD_TOKEN, DISCORD_CLIENT_ID } from "../config/index.js";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

const COMMANDS: (Command | SlashCommand)[] = [];
const SLASH_COMMANDS: SlashCommandBuilder[] = [];
const commandsDir = join(__dirname, "../commands");

const loadCommands = async (client: Client) => {
    try {
        const commandCategories = await readdir(commandsDir);
        for (let i = 0; i < commandCategories.length; i++) {
            const commandCategory = commandCategories[i];
            const categoryDir = join(commandsDir, commandCategory);

            if (commandCategory === "") continue;

            let commandsFiles = await readdir(categoryDir);
            commandsFiles = [...commandsFiles].filter(
                (f) => f.endsWith(".ts") || f.endsWith(".js")
            );

            for (let j = 0; j < commandsFiles.length; j++) {
                const files = commandsFiles[j];
                const importDir = join(categoryDir, files);

                const COMMAND = await import(`file:///${importDir}`);
                const { command } = COMMAND;

                if (command?.data) {
                    SLASH_COMMANDS.push(command.data.toJSON());
                }

                if (command?.name) {
                    client.commands.set(command.name, command);
                } else {
                    continue;
                }
                COMMANDS.push(command);
            }
        }
    } catch (err) {
        console.log(chalk.red(err.message));
        console.log(err);
    }
};

export const handle = async (client: Client) => {
    try {
        console.log("Started refreshing application [/] commands.");
        await loadCommands(client);
        const cmds = await rest.put(
            Routes.applicationCommands(DISCORD_CLIENT_ID),
            {
                body: SLASH_COMMANDS,
            }
        );
        console.log(
            `🔥 Successfully loaded ${(cmds as any[])?.length} command(s)`
                .bgBlack.green
        );
        (cmds as any[]).forEach((c) =>
            console.log(`Loaded ${c.name} command!`)
        );
        console.log("Successfully registered application commands.");
    } catch (error) {
        console.error(error);
        console.log(error.code);
    }
};

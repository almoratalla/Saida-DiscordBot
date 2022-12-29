import chalk from "chalk";
import { readdir, readFile } from "fs/promises";
import { createSpinner } from "nanospinner";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const schematics = JSON.parse(await readFile(new URL("../schema/schematics.json", import.meta.url)));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const findNameOrAlias = (arr, input) => arr.find(o => o.name === input || o.aliases.find(a => a === input));

export const commandsDir = join(__dirname, "../../src", "commands");
export const commandCategories = await readdir(commandsDir);

export const checkSchematic = (cmd, schematic) => {
    try {
        if (!schematic || undefined) {
            throw "Missing <schematic> argument. Please provide schematic.\n";
        }

        const command = findNameOrAlias(schematics.commands, cmd);
        const validSchematic = findNameOrAlias(command.schematics, schematic);
        if (!validSchematic) {
            throw chalk.yellow(`[Warn] Provided scheme \`${schematic}\` is not a valid schematic.`);
        }
        return validSchematic;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

export const getSchematicDir = (schematic) => {
    return join(__dirname, "../../src", `${schematic}s`);
};

export const validateSchemaName = (name) => {
    return name.trim().split("/").splice(0, 2);
};

export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export const processAnswer = async (result, init, message) => {
    const spinner = createSpinner(init || "Checking input...").start();
    await sleep();

    if (result === "success") {
        spinner.success({ text: message });
    } else {
        spinner.error({ text: message });
    }
};

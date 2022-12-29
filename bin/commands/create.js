import inquirer from "inquirer";
import { Command } from "commander";
import { checkSchematic, commandsDir, getSchematicDir } from "../utils/index.js";
import { readdir } from "fs/promises";
import { schemaCreate } from "../schema/index.js";
import chalk from "chalk";

// schematic = command, event, handler, command category
const createActionHandler = async (schematic, name, category, options) => {

    // Check if schematic is valid, returns undefined if invalid
    schematic = checkSchematic("create", schematic);

    // If there is no schematic, ask for schematic
    while (!schematic) {
        // Ask schematic
        schematic = await validateNoSchematic(schematic);
        schematic = checkSchematic("create", schematic);
    }

    // If there is no name, ask for a name
    // If there is a name, validate the name
    // If the name is valid, check category
    name = await chooseArgsOrOpt("name", name, options);
    if (!name) {
        console.log(chalk.yellow("[Warn] No name defined for your schematic! Please provide a corresponding name."));
        name = await validateNoName(name);
    }
    // Validate the name here

    // Check category, create if not existing
    category = await chooseArgsOrOpt("category", category, options);
    if (!category) {
        category = await validateNoCategory(category, schematic.name);
    }

    await createSchematic(schematic, name, category);


    return schematic;
};

const askSchematic = async () => {
    try {
        const askSchematicPrompt = await inquirer.prompt({
            name: "schematicAnswer",
            type: "list",
            message: "Select which schematic to create.",
            choices: ["command", "event", "handler", "command category"]
        });
        return askSchematicPrompt.schematicAnswer;
    } catch (error) {
        console.log(error);
    }
};

const askName = async () => {
    try {
        const askNamePrompt = await inquirer.prompt({
            name: "nameAnswer",
            type: "input",
            message: "Enter a name for your schematic:"
        });
        return askNamePrompt.nameAnswer;
    } catch (error) {
        console.log(error);
    }
};

const askCategory = async (schematic) => {
    try {
        const schematicDir = getSchematicDir(schematic);
        const choices = await readdir(schematicDir);
        const askCategoryPrompt = await inquirer.prompt({
            name: "categoryAnswer",
            type: "list",
            message: "Choose a category for your schematic or create a new category:",
            choices: [...choices, "create new category?"]
        });

        if (askCategoryPrompt.categoryAnswer === "create new category?") {
            const createCategoryPrompt = await inquirer.prompt({
                name: "categoryAnswer",
                type: "input",
                message: "Enter a new category name"
            });


            if (choices.includes(createCategoryPrompt.categoryAnswer)) {
                console.log(`Category already exists. Setting ${createCategoryPrompt.categoryAnswer} as category`);
            }
            return createCategoryPrompt.categoryAnswer;
        }
        return askCategoryPrompt.categoryAnswer;
    } catch (error) {
        console.log(error);
    }
};

const validateNoSchematic = async (schematic) => {

    if (!schematic || schematic === undefined) {
        schematic = await askSchematic();
    }
    return schematic;
};

const validateNoName = async (name) => {
    if (!name || name === undefined) {
        name = await askName();
    }
    return name;
};

const validateNoCategory = async (category, schematic) => {
    if (!category || category === undefined) {
        category = await askCategory(schematic);
    }
    return category;
};

const chooseArgsOrOpt = async (a, arg, opt) => {
    if (arg && opt[a]) {
        if (arg === opt[a]) return arg;
        try {
            const argsOrOptPrompt = await inquirer.prompt({
                name: "argsOrOptAnswer",
                type: "checkbox",
                message: "Select which schematic to create.",
                choices: [{
                    name: `Argument: ${arg}`
                }, {
                    name: `Parameter: ${opt[a]}`
                }]
            });
            return argsOrOptPrompt.argsOrOptAnswer;
        } catch (error) {
            console.log(error);
        }
    }

    if (arg) {
        return arg;
    }
    if (opt) {
        return opt[a];
    }
    return undefined;
};

const askCreateCommandArgs = async () => {
    try {
        const askDescPrompt = await inquirer.prompt({
            name: "descArgs",
            type: "input",
            message: "Provide a description for your command:"
        });
        const askAliasesPrompt = await inquirer.prompt({
            name: "aliasesArgs",
            type: "input",
            message: "Provide aliases for your command (Multiple aliases should be separated by commas. e.g: ping,p,png):"
        });
        const askCooldownPrompt = await inquirer.prompt({
            name: "cdArgs",
            type: "number",
            message: "Provide desired cooldown for your command:"
        });
        const askSlashDescPrompt = await inquirer.prompt({
            name: "slashDescArgs",
            type: "input",
            message: "Provide alternate description for slash command:"
        });
        return { desc: askDescPrompt.descArgs, aliases: askAliasesPrompt.aliasesArgs, cooldown: askCooldownPrompt.cdArgs || 0, slashDesc: askSlashDescPrompt.slashDescArgs };
    } catch (error) {
        console.log(error);
    }
};

const createSchematic = async (s, n, c) => {
    try {
        if (s.name === "command") {
            const commandArgs = await askCreateCommandArgs();
            schemaCreate(s.name, { s: s.name, n, c, ...commandArgs });
        }
    } catch (error) {
        console.log(error);
    }
};

export const create = new Command("create");

// commands
// events
// handlers

create
    .name("create")
    .description("Create templates for Saida bot")
    .argument("[schematic]", "Schema to create")
    .argument("[name]", "Name of the schematic")
    .argument("[category]", "Category of schematic")
    .aliases(["c", "cr", "crt"])
    .option("-n, --name [name]", "Name of the schematic")
    .option("-c, --category [category]", "Category of schematic")
    .option("-p, --path <path>", "separator character", commandsDir)
    .action(createActionHandler);

export default create;

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { commandsDir, processAnswer } from "../utils/index.js";
import chalk from "chalk";
import { fileURLToPath } from "url";
import * as ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createSchema = ({ c, n, s, ...args }) => {
    const commandCategoryDir = join(commandsDir, c);
    const commandFile = join(commandCategoryDir, `${n}.ts`);
    const templatePath = join(__dirname, "../templates", "command.template");
    const templateStats = statSync(templatePath);

    if (existsSync(commandFile)) {
        processAnswer("fail", `Initiating create ${s}: ${n}, category: ${c} `, chalk.red(`Command ${n} in ${commandCategoryDir} already exists. Delete or use another name.`));
        return false;
    }

    if (!existsSync(commandCategoryDir)) {
        console.log(chalk.blue(`Category doesn't exist yet. Creating ${c} category...`));
        mkdirSync(commandCategoryDir);
    }

    if (templateStats.isFile()) {
        const contents = readFileSync(templatePath, "utf-8");
        const renderContents = ejs.render(contents, { cmd: n, ...args });
        writeFileSync(commandFile, renderContents, "utf-8");
    }

    processAnswer("success", `Initiating create ${s}: ${n}, category: ${c} `, "Successfully created command");
    return true;
};

export default createSchema;
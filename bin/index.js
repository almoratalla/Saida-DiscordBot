#! /usr/bin/env node

import { Command } from "commander";
import create from "./commands/create.js";

const program = new Command();


program.addCommand(create);
program.configureOutput({
    writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
    writeErr: (str) => process.stdout.write(str.startsWith("Usage:") ? str : `[ERR] ${str}`),
    outputError: (str, write) => write(`\x1b[31m${str.startsWith("error:") ? str.slice(6).trim() : str}\x1b[0m`)
});

try {
    program.parse(process.argv);
} catch (error) {
    console.log("Error");
    console.log("error", error);
}
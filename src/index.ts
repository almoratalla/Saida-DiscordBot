// Require the necessary discord.js classes
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { dirname, join } from "path";
import { readdirSync } from "fs";

// Load Bot Config
import { DISCORD_TOKEN } from "./config/index.js";
import { Command, SlashCommand } from "./types/index.js";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Extract Discord Events and Intents
const { Guilds, MessageContent, GuildMessages } = GatewayIntentBits;

// Create a new client instance
const client = new Client({
    intents: [Guilds, MessageContent, GuildMessages],
});

// Extend the client instance with collections
client.slashCommands = new Collection<string, SlashCommand>();
client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();

// Load Handlers
const handlers = join(__dirname, "./handlers");
readdirSync(handlers).forEach(async (handler) => {
    try {
        const h = await import(`file:///${handlers}/${handler}`);
        await h.handle(client);
    } catch (error) {
        console.log(chalk.red(error.message));
        console.log(error);
    }
});

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);

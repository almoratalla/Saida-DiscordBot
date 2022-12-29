import { Client } from "discord.js";
import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eventsDir = join(__dirname, "../events");

const loadEvents = async (client: Client) => {
    try {
        const eventCategories = await readdir(eventsDir);
        for (let i = 0; i < eventCategories.length; i++) {
            const eventCategory = eventCategories[i];
            const eventDir = join(eventsDir, eventCategory);

            if (eventCategory === "") continue;

            let eventsFiles = await readdir(eventDir);
            eventsFiles = [...eventsFiles].filter(
                (f) => f.endsWith(".ts") || f.endsWith(".js")
            );

            for (let j = 0; j < eventsFiles.length; j++) {
                const files = eventsFiles[j];
                const importDir = join(eventDir, files);

                const EVENT = await import(`file:///${importDir}`);
                const { event } = EVENT;

                if (event?.once) {
                    client.once(event.name, (...args) =>
                        event.execute(...args)
                    );
                } else {
                    client.on(event.name, (...args) => event.execute(...args));
                }
                console.log(`🌠 Successfully loaded event ${event.name}`.blue);
            }
        }
    } catch (err) {
        console.log(chalk.red(err.message));
        console.log(err);
    }
};

export const handle = async (client: Client) => {
    try {
        await loadEvents(client);
    } catch (error) {
        console.error(error);
        console.log(error.code);
    }
};

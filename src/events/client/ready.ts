import { Client, Events, ActivityType } from "discord.js";

export const event = {
    name: Events.ClientReady,
    once: true,
    execute: (client: Client) => {
        if (client === null) return;

        console.log("Saida is preparing ...");
        console.log(`Ready! Logged in as ${client?.user?.tag}`);
        console.log("SaiDa online");
        console.log(
            `Logged in as ${client?.user?.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`
        );
        if (client.user) {
            client.user.setPresence({
                status: "online",
                activities: [
                    { name: "with your heart", type: ActivityType.Playing },
                ],
            });
        }
    },
};

export default event;

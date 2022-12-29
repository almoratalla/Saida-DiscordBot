import { ChannelType, Collection, Events, Message } from "discord.js";
import { PREFIX } from "../../config/constants.js";
import { Command } from "../../types/index.js";
import { checkPermissions, sendTimedMessage } from "../../utils/index.js";

export const event = {
    name: Events.MessageCreate,
    execute: async (message: Message) => {
        if (!message.member || message.member.user.bot) return;
        if (!message.content.startsWith(PREFIX) || message.author.bot) {
            return;
        }
        if (message.channel.type !== ChannelType.GuildText) return;

        const args = message.content.slice(PREFIX.length).split(/\s+/g);
        const cmd = args.shift()?.toLowerCase() || "";

        let command =
            message.client.commands.get(cmd) ||
            message.client.commands.find(
                (a: Command) => a.aliases && a.aliases.includes(cmd)
            );

        const opts = { args };

        try {
            if (!command) {
                let commandFromAlias = message.client.commands.find(
                    (command: Command) => command.aliases.includes(args[0])
                );
                if (commandFromAlias) command = commandFromAlias;
                else {
                    return message.reply("No command found!");
                }
            }

            const cdName = `${command.name}-${message.member.user.username}`;

            if (!message.client.cooldowns.has(cdName)) {
                message.client.cooldowns.set(cdName, new Collection());
            }

            const cooldown = message.client.cooldowns.get(cdName);
            const cooldown_amount = command.cooldown * 1000;
            let neededPermissions = checkPermissions(
                message.member,
                command.permissions
            );
            if (neededPermissions !== null)
                return sendTimedMessage(
                    `
                You don't have enough permissions to use this command.
                \n Needed permissions: ${neededPermissions.join(", ")}
                `,
                    message.channel,
                    5000
                );

            if (command.cooldown && cooldown) {
                if (Date.now() < cooldown) {
                    sendTimedMessage(
                        `You have to wait ${Math.floor(
                            Math.abs(Date.now() - cooldown) / 1000
                        )} second(s) to use this command again.`,
                        message.channel,
                        5000
                    );
                    return;
                }
                message.client.cooldowns.set(
                    cdName,
                    Date.now() + cooldown_amount
                );
                setTimeout(() => {
                    message.client.cooldowns.delete(cdName);
                }, cooldown_amount);
            } else if (command.cooldown && !cooldown) {
                message.client.cooldowns.set(
                    cdName,
                    Date.now() + cooldown_amount
                );
            }

            await command.execute(message, opts);
        } catch (err) {
            message.reply("There was an error trying to execute this command!");
            console.log(err);
            console.error(err.name);
        }
    },
};

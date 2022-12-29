import { Message, PermissionFlagsBits } from "discord.js";

export const command = {
    name: "greet",
    execute: (message: Message) => {
        console.log(message);
        let toGreet = message.mentions.members?.first();
        message.channel.send(
            `Hello there ${
                toGreet ? toGreet.user.username : message.member?.user.username
            }!`
        );
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers], // to test
};

export default command;

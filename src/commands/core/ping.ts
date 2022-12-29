import { ApplicationCommandType, SlashCommandBuilder } from "discord.js";
import { Command, SlashCommand } from "../../types/index.js";
// const wait = require("util").promisify(setTimeout);
const questionableLink =
    "https://i.giphy.com/media/2KZ2v2vifTGTvGg1fu/giphy720p.mp4";

const COMMAND_NAME = "ping";

export const command: Command | SlashCommand = {
    name: COMMAND_NAME,
    description: "Saida ping command",
    aliases: ["p!"],
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName(COMMAND_NAME)
        .setDescription("Saida pings you back!")
        .addMentionableOption((option) =>
            option
                .setName("mention")
                .setDescription("Saida can also ping someone else")
        ),
    execute: async (event: any) => {
        console.log("reply", event.reply);
        console.log("channel", event.channel);

        // Event type === 'APPLICATION_COMMAND' during interactionCreate events replaced by ApplicationCommandType.User which is 2
        if (event.type === ApplicationCommandType.User) {
            const interaction = event;
            const mentionable = interaction.options.getMentionable("mention");
            try {
                await interaction.reply({
                    content: `Pong ${
                        mentionable ? mentionable : interaction.user
                    }!`,
                });
                // await wait(2000);
                await interaction.followUp(questionableLink);
                return;
            } catch (err) {
                console.log(err);
            }
        }
        const message = event;
        message.channel.send("pong!");
        message.channel.send(questionableLink);
    },
};

export default command;
